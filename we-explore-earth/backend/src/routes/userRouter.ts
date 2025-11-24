import express from "express";
import {
  getUser
} from "../controllers/userController";

const router = express.Router();

// /users/:id
router.get("/:id", getUser);

export default router;
