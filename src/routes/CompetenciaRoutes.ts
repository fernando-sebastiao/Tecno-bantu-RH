import { Router } from "express";
import {
  createCompetenciaController,
  deleteCompetenciaController,
  getbyIdCompetenciaController,
  updateCompetenciaController,
} from "../controllers/Competencia/competenciaController";
import { getAllCompetencia } from "../models/Competencia/list";

export const CompetenciaRoutes = Router();

CompetenciaRoutes.post("/", createCompetenciaController);
CompetenciaRoutes.get("/", getAllCompetencia);
CompetenciaRoutes.put("/:id", updateCompetenciaController);
CompetenciaRoutes.get("/:id", getbyIdCompetenciaController);
CompetenciaRoutes.delete("/:id", deleteCompetenciaController);
