import { Router } from "express";
import {
  createDepartamentoController,
  updateDepartamentoController,
} from "../controllers/Departamento/departamentoController";

export const DepartamentoRoutes = Router();

DepartamentoRoutes.post("/", createDepartamentoController);
DepartamentoRoutes.put("/:id", updateDepartamentoController);
