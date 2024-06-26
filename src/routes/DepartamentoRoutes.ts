import { Router } from "express";
import {
  createDepartamentoController,
  deleteDepartamentoController,
  updateDepartamentoController,
} from "../controllers/Departamento/departamentoController";
import { getAllDepartamento } from "../models/Departamento/list";

export const DepartamentoRoutes = Router();

DepartamentoRoutes.post("/", createDepartamentoController);
DepartamentoRoutes.put("/:id", updateDepartamentoController);
DepartamentoRoutes.delete("/:id", deleteDepartamentoController);
DepartamentoRoutes.get("/", getAllDepartamento);
