import { Request, Response } from "express";
import admin from "firebase-admin";

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

export async function addAdmin(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await db.doc("config/shared").update({
      admins: admin.firestore.FieldValue.arrayUnion(email.toLowerCase()),
    });

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

  try {
    await db.doc("config/shared").update({
      admins: admin.firestore.FieldValue.arrayRemove(email.toLowerCase()),
    });

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
