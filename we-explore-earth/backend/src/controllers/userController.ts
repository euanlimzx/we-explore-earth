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
    const { email, password, username, firstName, lastName, notifications} = req.body;

    if (!email || !password || !username || !firstName || !lastName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    //Part 1: Validate the user using firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    await admin.auth().generateEmailVerificationLink(email); //email verification link
      
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

// GET /users/login
export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verify email/password combination using Firebase REST API
    const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;
    const authResponse = await fetch(authUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    });

    if (!authResponse.ok) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Get user details from Firebase Auth
    const user = await admin.auth().getUserByEmail(email);

    // Check if user is authenticated
    if (!user.emailVerified) {
      return res.status(400).json({ 
        error: "Please verify your email before logging in" 
      });
    }

    // Get user from database
    const userDoc = await db.collection("users").doc(user.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ id: userDoc.id, ...userDoc.data() });
  
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};