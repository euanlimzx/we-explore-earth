import { db } from "../firestore";
import { Request, Response } from "express";

// GET /config - Get all config documents
export async function getConfig(req: Request, res: Response) {
  try {
    const snapshot = await db.collection("config").get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "No config found" });
    }

    const configs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(configs);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
