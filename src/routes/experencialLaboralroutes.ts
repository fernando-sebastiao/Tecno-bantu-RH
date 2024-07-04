import { Router } from "express";
import {
  createExperencialLaboralController,
  deleteExperencialLaboralController,
  FiltrarExperencialLaboralController,
  updateExperencialLaboralController,
} from "../controllers/ExperencialLaboral/experencialLaboralController";
import { getAllExperencialLaboral } from "../models/ExperencialLaboral/list";

export const ExperencialLaboralRoutes = Router();

ExperencialLaboralRoutes.post("/", createExperencialLaboralController);
ExperencialLaboralRoutes.get("/", getAllExperencialLaboral);
ExperencialLaboralRoutes.get("/:id", getAllExperencialLaboral);
ExperencialLaboralRoutes.delete("/:id", deleteExperencialLaboralController);
ExperencialLaboralRoutes.put("/:id", updateExperencialLaboralController);
ExperencialLaboralRoutes.get("/filter", FiltrarExperencialLaboralController);
