import { db } from "../firestore";
import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  try {
    const doc = await db.collection("users").doc(req.params.id).get();

    if (!doc.exists) return res.status(404).json({ error: "User not found" });

    res.json({ id: doc.id, ...doc.data() });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};