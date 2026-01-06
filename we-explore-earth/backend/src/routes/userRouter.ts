import express from "express";
import {
  getUser,
  signupUser,
  loginUser,
  resetPassword
} from "../controllers/userController";

const router = express.Router();

// GET /users/:id
router.get("/:id", getUser);

// POST /users/signup
router.post("/signup", signupUser);

// POST /users/login
router.post("/login", loginUser);

// POST /users/reset for resetting the user password by email
router.post("/reset", resetPassword);

export default router;