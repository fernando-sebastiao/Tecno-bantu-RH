import { Router } from "express";
import {
  FiltrarSubCarreiraController,
  createSubCarreiraController,
  deleteSubCarreiraController,
  getbyIdSubcarreiraController,
  updateSubCarreiraController,
} from "../controllers/Subcarreira/subCarreiraController";
import { getAllSubCarreiras } from "../models/SubCarreira/list";

export const SubCarreiraRoutes = Router();

SubCarreiraRoutes.post("/", createSubCarreiraController);
SubCarreiraRoutes.get("/filter", FiltrarSubCarreiraController);
SubCarreiraRoutes.get("/:id", getbyIdSubcarreiraController);
SubCarreiraRoutes.delete("/:id", deleteSubCarreiraController);
SubCarreiraRoutes.put("/:id", updateSubCarreiraController);
SubCarreiraRoutes.get("/", getAllSubCarreiras);
