import { Router } from "express";
import {
  getAdmins,
  addAdmin,
  removeAdmin,
} from "../controllers/configController";

const router = Router();

router.get("/admins", getAdmins);
router.post("/admin", addAdmin);
router.delete("/admin", removeAdmin);

export default router;
