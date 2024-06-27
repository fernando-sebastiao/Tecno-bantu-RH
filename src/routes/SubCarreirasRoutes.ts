import { Router } from "express";
import {
  createSubCarreiraController,
  deleteSubCarreiraController,
  getbyIdSubCarreiraController,
  updateSubCarreiraController,
} from "../controllers/Subcarreira/subCarreiraController";
import { getAllSubCarreiras } from "../models/SubCarreira/list";

export const SubCarreiraRoutes = Router();

SubCarreiraRoutes.post("/", createSubCarreiraController);
SubCarreiraRoutes.get("/", getbyIdSubCarreiraController);
SubCarreiraRoutes.delete("/:id", deleteSubCarreiraController);
SubCarreiraRoutes.put("/:id", updateSubCarreiraController);
SubCarreiraRoutes.get("/all", getAllSubCarreiras);
