import { Router } from "express";
import {
  createInstitution,
  getAllInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution
} from "../controllers/institutionController";

const router = Router();

router.post("/", createInstitution);
router.get("/", getAllInstitutions);
router.get("/:id", getInstitutionById);
router.put("/:id", updateInstitution);
router.delete("/:id", deleteInstitution);

export default router;
