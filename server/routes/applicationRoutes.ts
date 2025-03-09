import { Router } from "express";
import {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication
} from "../controllers/applicationController";

const router = Router();

router.post("/", createApplication);
router.get("/", getAllApplications);
router.get("/:id", getApplicationById);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;
