import express from "express";
import { getConfig } from "../controllers/configController";

const router = express.Router();

router.get("/", getConfig);

export default router;
