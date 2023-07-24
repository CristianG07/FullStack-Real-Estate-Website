import { Router } from "express";
import {
  CreateResidency,
  getAllResidencies,
  getResidency,
} from "../controllers/residencyController.js";

const router = Router();

router.post("/create", CreateResidency);
router.get("/allresd", getAllResidencies);
router.get("/:id", getResidency);

export { router as residencyRoute };
