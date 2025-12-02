import express from "express";
import {
  getUser,
  signupUser
} from "../controllers/userController";

const router = express.Router();

// GET /users/:id
router.get("/:id", getUser);

// POST /users/signup
router.post("/signup", signupUser);

export default router;