import express from "express";
import {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
} from "../controllers/eventController";

const router = express.Router();

// POST /events/create
router.post("/create", createEvent);

// PUT /events/:id
router.put("/:id", updateEvent);

// GET /events/:id
router.get("/:id", getEvent);

// GET /events/
router.get("/", getAllEvents);

export default router;
