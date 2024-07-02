import { Router } from "express";
import { createCompetenciaController } from "../controllers/Competencia/competenciaController";

export const CompetenciaRoutes = Router();

CompetenciaRoutes.post("/", createCompetenciaController);
