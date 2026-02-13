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

// GET /categories - Get event tags config (categories)
export async function getCategories(req: Request, res: Response) {
  try {
    const sharedDoc = await db.collection("config").doc("shared").get();

    if (!sharedDoc.exists) {
      return res.status(404).json({ error: "Shared config document not found" });
    }

    const data = sharedDoc.data();
    if (!data) {
      return res.status(404).json({ error: "Shared config data is empty" });
    }

    // Return only the EventTagsConfig (document data without the id field)
    res.json(data);
  } catch (e: any) {
    console.error("Error fetching categories:", e);
    res.status(500).json({ error: e.message || "Failed to fetch categories" });
  }
}
