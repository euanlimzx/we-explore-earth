import { db } from "../firestore";
import { Request, Response } from "express";
import admin from "firebase-admin";
import { User } from "../types/user";

// GET /users/:id
export async function getUser(req: Request, res: Response) {
  try {
    const doc = await db.collection("users").doc(req.params.id).get();

    if (!doc.exists) return res.status(404).json({ error: "User not found" });

    res.json({ id: doc.id, ...doc.data() });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

// POST /users/signup
export async function signupUser(req: Request, res: Response) {
  try {
    const { email, password, username, firstName, lastName, age, notifications, privacy } = req.body;

    if (!email || !password || !username || !firstName || !lastName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    //Part 1: Validate the user using firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    //Part 2: Create user document
    const userData: User = {
      username,
      email,
      firstName,
      lastName,
      notificationToken: null,
      isAdmin: false,
    };

    //Part 3: POST user document to Firestore collection
    await db.collection("users").doc(userRecord.uid).set(userData);

    res.status(201).json({ 
      message: "User created successfully",
      uid: userRecord.uid 
    });

  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};