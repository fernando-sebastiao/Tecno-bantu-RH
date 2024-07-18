import { Router } from "express";
import {
  FiltrarDepartamentoController,
  createDepartamentoController,
  deleteDepartamentoController,
  getbyIdDepartamentoController,
  updateDepartamentoController,
} from "../controllers/Departamento/departamentoController";
import { GetallFuncionarioDepartamento } from "../models/Departamento/funcionarioDepartamento";
import { getAllDepartamento } from "../models/Departamento/list";

export const DepartamentoRoutes = Router();

DepartamentoRoutes.post("/", createDepartamentoController);
DepartamentoRoutes.put("/:id", updateDepartamentoController);
DepartamentoRoutes.delete("/:id", deleteDepartamentoController);
DepartamentoRoutes.get("/", getAllDepartamento);
DepartamentoRoutes.get("/filter", FiltrarDepartamentoController);
DepartamentoRoutes.get("/:id", getbyIdDepartamentoController);
DepartamentoRoutes.get("/:id/funcionarios", GetallFuncionarioDepartamento);
