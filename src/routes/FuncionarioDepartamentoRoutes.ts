import { Router } from "express";
import {
  FiltrarFuncionarioDepartamentoController,
  createFuncionarioDepartamentoController,
  deleteFuncionarioDepartamentoController,
  getbyIdFuncionarioDepartamentoController,
  updateFuncionarioDepartamentoController,
} from "../controllers/FuncionarioDepartamento/funcioDepartController";
import { getAllFuncionarioDepartamento } from "../models/FuncionarioDepartamento/list";

export const FuncionarioDepartamentoRoutes = Router();

FuncionarioDepartamentoRoutes.post(
  "/",
  createFuncionarioDepartamentoController
);
FuncionarioDepartamentoRoutes.get("/", getAllFuncionarioDepartamento);
FuncionarioDepartamentoRoutes.delete(
  "/:id",
  deleteFuncionarioDepartamentoController
);
FuncionarioDepartamentoRoutes.get(
  "/filter",
  FiltrarFuncionarioDepartamentoController
);
FuncionarioDepartamentoRoutes.put(
  "/:id",
  updateFuncionarioDepartamentoController
);
FuncionarioDepartamentoRoutes.get(
  "/:id",
  getbyIdFuncionarioDepartamentoController
);
