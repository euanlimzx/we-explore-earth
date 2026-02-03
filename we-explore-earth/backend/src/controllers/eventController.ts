import { db } from "../firestore";
import { Request, Response } from "express";
import admin from "firebase-admin";
import { Event } from "../types/event";

// create event
export async function createEvent(req: Request, res: Response) {
  try {
    const { title, description, location, timeStart, timeEnd, price, maxAttendees, rsvpDeadline, hostedBy, tags } = req.body;

    if (!title || !description || !location || !timeStart || !timeEnd || !price || !maxAttendees || !rsvpDeadline == null || !hostedBy || !tags) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const eventData: Event = {
      title,
      description,
      location,
      timeStart: new Date(timeStart),
      timeEnd: new Date(timeEnd),
      price,
      hostedBy,
      tags,
      maxAttendees,
      rsvpDeadline: new Date (rsvpDeadline)
    };

    const docRef = await db.collection("events").add(eventData);

    return res.status(201).json({ id: docRef.id, ...eventData });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ error: "Failed to create event" });
  }
}

export async function getEvent (req: Request, res: Response) {
  try {
    const event = await db.collection("events").doc(req.params.id).get();
    if (!event.exists){
      return res.status(404).json({error: "Event not found"});
    }
    res.json({id: event.id, ...event.data()})
  }
  catch(error){
    console.error("Error fetching event: ", error);
    return res.status(500).json({error: "Failed to fetch event" });
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
    return res.status(500).json({ error: "failed to fetch events from database" });
  }
}

// POST /events/:id/rsvp - Add or update RSVP
export async function addOrUpdateRSVP(req: Request, res: Response) {
  try {
    const eventId = req.params.id;
    const { userID, status } = req.body;

    // Validate required fields
    if (!userID || !status) {
      return res.status(400).json({ error: "userID and status are required" });
    }

    // Validate status value
    if (status !== 'YES' && status !== 'MAYBE') {
      return res.status(400).json({ error: "status must be 'YES' or 'MAYBE'" });
    }

    const eventRef = db.collection("events").doc(eventId);
    const userRef = db.collection("users").doc(userID);

    // Use transaction to update both documents atomically
    await db.runTransaction(async (transaction) => {
      const eventDoc = await transaction.get(eventRef);
      const userDoc = await transaction.get(userRef);

      if (!eventDoc.exists) {
        throw new Error("Event not found");
      }
      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const eventData = eventDoc.data()!;
      const userData = userDoc.data()!;

      // Update event's attendees array
      const attendees = eventData.attendees || [];
      const existingAttendeeIndex = attendees.findIndex((a: { userID: string }) => a.userID === userID);
      if (existingAttendeeIndex >= 0) {
        attendees[existingAttendeeIndex].status = status;
      } else {
        attendees.push({ userID, status });
      }

      // Update user's events array
      const userEvents = userData.events || [];
      const existingEventIndex = userEvents.findIndex((e: { eventID: string }) => e.eventID === eventId);
      if (existingEventIndex >= 0) {
        userEvents[existingEventIndex].status = status;
      } else {
        userEvents.push({ eventID: eventId, status });
      }

      transaction.update(eventRef, { attendees });
      transaction.update(userRef, { events: userEvents });
    });

    return res.status(200).json({ message: "RSVP updated successfully" });
  } catch (error: any) {
    console.error("Error updating RSVP:", error);
    if (error.message === "Event not found" || error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to update RSVP" });
  }
}

// DELETE /events/:id/rsvp - Remove RSVP
export async function removeRSVP(req: Request, res: Response) {
  try {
    const eventId = req.params.id;
    const { userID } = req.body;

    // Validate required fields
    if (!userID) {
      return res.status(400).json({ error: "userID is required" });
    }

    const eventRef = db.collection("events").doc(eventId);
    const userRef = db.collection("users").doc(userID);

    // Use transaction to update both documents atomically
    await db.runTransaction(async (transaction) => {
      const eventDoc = await transaction.get(eventRef);
      const userDoc = await transaction.get(userRef);

      if (!eventDoc.exists) {
        throw new Error("Event not found");
      }
      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const eventData = eventDoc.data()!;
      const userData = userDoc.data()!;

      // Remove user from event's attendees array
      const attendees = (eventData.attendees || []).filter(
        (a: { userID: string }) => a.userID !== userID
      );

      // Remove event from user's events array
      const userEvents = (userData.events || []).filter(
        (e: { eventID: string }) => e.eventID !== eventId
      );

      transaction.update(eventRef, { attendees });
      transaction.update(userRef, { events: userEvents });
    });

    return res.status(200).json({ message: "RSVP removed successfully" });
  } catch (error: any) {
    console.error("Error removing RSVP:", error);
    if (error.message === "Event not found" || error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to remove RSVP" });
  }
}