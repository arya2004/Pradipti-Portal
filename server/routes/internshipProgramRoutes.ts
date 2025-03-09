import { Router } from "express";
import {
  createInternshipProgram,
  getAllInternshipPrograms,
  getInternshipProgramById,
  updateInternshipProgram,
  deleteInternshipProgram
} from "../controllers/internshipProgramController";

const router = Router();

router.post("/", createInternshipProgram);
router.get("/", getAllInternshipPrograms);
router.get("/:id", getInternshipProgramById);
router.put("/:id", updateInternshipProgram);
router.delete("/:id", deleteInternshipProgram);

export default router;
