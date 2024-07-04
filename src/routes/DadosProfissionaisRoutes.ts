import { Router } from "express";
import {
  createDadosProfissionaisController,
  FiltrarDadosProfissionaisController,
  getbyIdDadosProfissionaisController,
  updateDadosProfissionaisController,
} from "../controllers/DadosProfissionais/dadosProfissionaisController";
import { getAllDadosProfissionais } from "../models/DadosProfissionais/list";

export const DadosProfissionaisRoutes = Router();

DadosProfissionaisRoutes.post("/", createDadosProfissionaisController);
DadosProfissionaisRoutes.put("/:id", updateDadosProfissionaisController);
DadosProfissionaisRoutes.delete("/:id", updateDadosProfissionaisController);
DadosProfissionaisRoutes.get("/", getAllDadosProfissionais);
DadosProfissionaisRoutes.get("/:id", getbyIdDadosProfissionaisController);
DadosProfissionaisRoutes.get("/filter", FiltrarDadosProfissionaisController);
