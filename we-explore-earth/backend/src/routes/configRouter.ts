import { Router } from "express";
import {
  getAdmins,
  addAdmin,
  removeAdmin,
  isAdmin
} from "../controllers/configController";

const router = Router();

router.get("/admins", getAdmins);
router.get("/is-admin", isAdmin);
router.post("/admin", addAdmin);
router.delete("/admin", removeAdmin);


export default router;
