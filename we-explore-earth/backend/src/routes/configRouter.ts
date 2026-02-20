import express from "express";
import { getCategories, getConfig } from "../controllers/configController";

const router = express.Router();

router.get("/", getConfig);
router.get("/categories", getCategories);

export default router;
