import express from "express";
import {
  getUser,
  getUserRSVPs,
  addOrUpdateUserRSVP,
  removeUserRSVP,
  updateUser,
  signupUser,
  loginUser,
  resetPassword
} from "../controllers/userController";

const router = express.Router();

// GET /users/:id/rsvps - must be before /:id to avoid conflict
router.get("/:id/rsvps", getUserRSVPs);

// POST /users/:id/rsvp
router.post("/:id/rsvp", addOrUpdateUserRSVP);

// DELETE /users/:id/rsvp
router.delete("/:id/rsvp", removeUserRSVP);

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