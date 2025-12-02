import express from "express";
import { createEvent } from "../controllers/eventController";

const router = express.Router();

// POST /events/create
router.post("/create", createEvent);

export default router;