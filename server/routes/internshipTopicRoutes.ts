import { Router } from "express";
import {
  createInternshipTopic,
  getAllInternshipTopics,
  getInternshipTopicById,
  updateInternshipTopic,
  deleteInternshipTopic
} from "../controllers/internshipTopicController";

const router = Router();

router.post("/", createInternshipTopic);
router.get("/", getAllInternshipTopics);
router.get("/:id", getInternshipTopicById);
router.put("/:id", updateInternshipTopic);
router.delete("/:id", deleteInternshipTopic);

export default router;
