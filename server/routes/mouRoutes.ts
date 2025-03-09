import { Router } from "express";
import {
  createMOU,
  getAllMOUs,
  getMOUById,
  updateMOU,
  deleteMOU
} from "../controllers/mouController";

const router = Router();

router.post("/", createMOU);
router.get("/", getAllMOUs);
router.get("/:id", getMOUById);
router.put("/:id", updateMOU);
router.delete("/:id", deleteMOU);

export default router;
