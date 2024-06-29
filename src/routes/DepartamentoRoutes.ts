import { Router } from "express";
import {
  FiltrarDepartamentoController,
  createDepartamentoController,
  deleteDepartamentoController,
  updateDepartamentoController,
} from "../controllers/Departamento/departamentoController";
import { getAllDepartamento } from "../models/Departamento/list";

export const DepartamentoRoutes = Router();

DepartamentoRoutes.post("/", createDepartamentoController);
DepartamentoRoutes.put("/:id", updateDepartamentoController);
DepartamentoRoutes.delete("/:id", deleteDepartamentoController);
DepartamentoRoutes.get("/all", getAllDepartamento);
DepartamentoRoutes.get("/", FiltrarDepartamentoController);
