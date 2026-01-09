import { db } from "../firestore";
import { Request, Response } from "express";
import admin from "firebase-admin";
import { Event } from "../types/event";

// GET /users/:id
export async function createEvent(req: Request, res: Response) {
  console.log("Creating event...");
  return res.status(501).json({ message: "Not implemented yet" });
}

//GET /events
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