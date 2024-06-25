import { Router } from "express";
import { createDepartamentoController } from "../controllers/Departamento/departamentoController";

export const DepartamentoRoutes = Router();

DepartamentoRoutes.post("/", createDepartamentoController);
