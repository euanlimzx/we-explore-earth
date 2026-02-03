import express from "express";
import { createEvent, getEvent, getAllEvents, addOrUpdateRSVP, removeRSVP } from "../controllers/eventController";

const router = express.Router();

// POST /events/create
router.post("/create", createEvent);

// GET /events/:id
router.get("/:id", getEvent);

// GET /events/
router.get("/", getAllEvents);

// POST /events/:id/rsvp
router.post("/:id/rsvp", addOrUpdateRSVP);

// DELETE /events/:id/rsvp
router.delete("/:id/rsvp", removeRSVP);

export default router;