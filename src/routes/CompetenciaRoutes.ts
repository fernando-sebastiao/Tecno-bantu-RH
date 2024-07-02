import { Router } from "express";
import {
  createCompetenciaController,
  updateCompetenciaController,
} from "../controllers/Competencia/competenciaController";
import { getAllCompetencia } from "../models/Competencia/list";

export const CompetenciaRoutes = Router();

CompetenciaRoutes.post("/", createCompetenciaController);
CompetenciaRoutes.get("/", getAllCompetencia);
CompetenciaRoutes.put("/:id", updateCompetenciaController);
