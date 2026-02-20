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

// GET /config/categories - Get all categories (for Filter Form component)
export async function getCategories(req: Request, res: Response) {
  try {
    const snapshot = await db.collection("config").doc("shared").get();
    if (!snapshot.exists) {
      return res.status(404).json({ error: "No config found" });
    }

    const categories = snapshot.data()?.category;
    if(!categories) {
      return res.status(404).json({ error: "No categories found" });
    }
    
    return res.json(categories);
  }
  catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}
