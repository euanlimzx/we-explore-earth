import { Router } from "express";
import {
  getAdmins,
  addAdmin,
  removeAdmin,
  isAdminUser
} from "../controllers/configController";

const router = Router();

router.get("/admins", getAdmins);
router.get("/is-admin", isAdminUser);
router.post("/admin", addAdmin);
router.delete("/admin", removeAdmin);


export default router;
