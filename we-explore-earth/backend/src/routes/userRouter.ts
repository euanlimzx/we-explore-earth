import express from "express";
import {
  getUser,
  getUserEvents,
  updateUser,
  signupUser,
  loginUser,
  resetPassword, 
  rsvpToEvent
} from "../controllers/userController";

const router = express.Router();

// GET /users/:id/events 
router.get("/:id/events", getUserEvents);

// POST /users/:id/rsvp
router.post("/:id/rsvp", rsvpToEvent);

// GET /users/:id
router.get("/:id", getUser);

// PATCH /users/:id
router.patch("/:id", updateUser);

// POST /users/signup
router.post("/signup", signupUser);

// POST /users/login
router.post("/login", loginUser);

// POST /users/reset for resetting the user password by email
router.post("/reset", resetPassword);

export default router;