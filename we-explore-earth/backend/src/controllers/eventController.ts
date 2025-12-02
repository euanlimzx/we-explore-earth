import { db } from "../firestore";
import { Request, Response } from "express";
import admin from "firebase-admin";
import { Event } from "../types/event";

// GET /users/:id
export async function createEvent(req: Request, res: Response) {
  console.log("Creating event...");
};