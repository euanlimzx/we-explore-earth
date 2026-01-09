import express from "express";
import { createEvent, getAllEvents } from "../controllers/eventController";

const router = express.Router();

//GET /events
router.get("/", getAllEvents)

// POST /events/create
router.post("/create", createEvent);

export default router;