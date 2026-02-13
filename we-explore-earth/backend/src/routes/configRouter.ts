import express from "express";
import { getConfig, getCategories } from "../controllers/configController";

const router = express.Router();

router.get("/", getConfig);
router.get("/categories", getCategories);

export default router;
