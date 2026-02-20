import { db } from "../firestore";
import { Request, Response } from "express";
import admin from "firebase-admin";
import { FirestoreEventData } from "@shared/types/event";

// create event
export async function createEvent(req: Request, res: Response) {
  try {
    const {
      title,
      description,
      location,
      timeStart,
      timeEnd,
      price,
      maxAttendees,
      rsvpDeadline,
      hostedBy,
      tags,
    } = req.body;

    if (
      !title ||
      !description ||
      !location ||
      !timeStart ||
      !timeEnd ||
      price == null ||
      !maxAttendees ||
      !rsvpDeadline ||
      !hostedBy ||
      !tags
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const eventData: FirestoreEventData = {
      title,
      description,
      location,
      timeStart: new Date(timeStart),
      timeEnd: new Date(timeEnd),
      price: typeof price === "string" ? parseInt(price, 10) : price,
      hostedBy,
      tags,
      maxAttendees:
        typeof maxAttendees === "string"
          ? parseInt(maxAttendees, 10)
          : maxAttendees,
      rsvpDeadline: new Date(rsvpDeadline),
    };

    const docRef = await db.collection("events").add(eventData);

    return res.status(201).json({ id: docRef.id, ...eventData });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ error: "Failed to create event" });
  }
}

export async function getEvent(req: Request, res: Response) {
  try {
    const event = await db.collection("events").doc(req.params.id).get();
    if (!event.exists) {
      return res.status(404).json({ error: "Event not found" });
    const event = await db.collection("events").doc(req.params.id as string).get(); // did 'as string' to avoid type error on mannys system.
    if (!event.exists){
      return res.status(404).json({error: "Event not found"});
    }
    res.json({ id: event.id, ...event.data() });
  } catch (error) {
    console.error("Error fetching event: ", error);
    return res.status(500).json({ error: "Failed to fetch event" });
  }
}

export async function getAllEvents(req: Request, res: Response) {
  try {
    //get the snapshop
    const snapshot = await db.collection("events").get();

    //maps the docs into an array
    const events = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data, // '...' merges into one object
      };
    });

    //send data back
    console.log(`Fetched ${events.length} events successfully`);
    return res.status(200).json(events);
  } catch (error) {
    console.error("Error in getAllEvents:", error);
    return res
      .status(500)
      .json({ error: "failed to fetch events from database" });
  }
}

// update event
export async function updateEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      timeStart,
      timeEnd,
      price,
      maxAttendees,
      rsvpDeadline,
      hostedBy,
      tags,
    } = req.body;

    if (
      !title ||
      !description ||
      !location ||
      !timeStart ||
      !timeEnd ||
      price == null ||
      !maxAttendees ||
      !rsvpDeadline ||
      !hostedBy ||
      !tags
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if event exists
    const eventRef = db.collection("events").doc(id);
    const eventDoc = await eventRef.get();
    
    if (!eventDoc.exists) {
      return res.status(404).json({ error: "Event not found" });
    }

    const eventData: FirestoreEventData = {
      title,
      description,
      location,
      timeStart: new Date(timeStart),
      timeEnd: new Date(timeEnd),
      price: typeof price === "string" ? parseInt(price, 10) : price,
      hostedBy,
      tags,
      maxAttendees:
        typeof maxAttendees === "string"
          ? parseInt(maxAttendees, 10)
          : maxAttendees,
      rsvpDeadline: new Date(rsvpDeadline),
    };

    await eventRef.update(eventData as any);

    return res.status(200).json({ id, ...eventData });
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({ error: "Failed to update event" });
  }
}
