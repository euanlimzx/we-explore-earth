import { Request, Response } from "express";
import admin from "firebase-admin";
import { updateDoc } from "firebase/firestore";

const db = admin.firestore();

export async function getAdmins(req: Request, res: Response) {
  try {
    const snap = await db.doc("config/shared").get();
    const data = snap.data();

    res.json({ admins: data?.admins ?? [] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function isAdminUser(req: Request, res: Response) {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const normalizedEmail = String(email).toLowerCase();

    const snap = await db.doc("config/shared").get();

    if (!snap.exists) {
      return res.status(500).json({ error: "Config not found" });
    }

    const admins: string[] = snap.data()?.admins ?? [];
    const isAdmin = admins.includes(normalizedEmail);

    return res.status(200).json({ isAdminUser: isAdmin });
  } catch (err) {
    console.error("isAdmin error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function addAdmin(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const normalizedEmail = email.toLowerCase();

  try {
    await db.doc("config/shared").update({
      admins: admin.firestore.FieldValue.arrayUnion(normalizedEmail),
    });

    const usersRef = db.collection("users");
    const snap = await usersRef.where("email", "==", normalizedEmail).limit(1).get();

    if (!snap.empty) {
      const userDocRef = snap.docs[0].ref;
      await userDocRef.set({ isAdmin: true }, { merge: true });
    }

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}


export async function removeAdmin(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const normalizedEmail = email.toLowerCase();

  try {
    await db.doc("config/shared").update({
      admins: admin.firestore.FieldValue.arrayRemove(normalizedEmail),
    });

    const userRef = db.collection("users")
    const snap = await userRef.where("email", "==", normalizedEmail).limit(1).get();

  
    if(!snap.empty){
      const userDocRef = snap.docs[0].ref;
      await userDocRef.set({ isAdmin: false }, { merge: true });
    }

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

