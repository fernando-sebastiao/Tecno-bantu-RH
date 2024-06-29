import { Router } from "express";

import {
  FiltrarFuncionarioController,
  createFuncionarioController,
  deleteFuncionario,
  getbyIdFuncionarioController,
  updateFuncionarioController,
} from "../controllers/Funcionario/funcionarioController";
import { getAllFuncionario } from "../models/Funcionario/listFuncionario";

export const FuncionarioRoutes = Router();

FuncionarioRoutes.post("/", createFuncionarioController);
FuncionarioRoutes.put("/:id", updateFuncionarioController);
FuncionarioRoutes.get("/filter", FiltrarFuncionarioController);
FuncionarioRoutes.get("/:id", getbyIdFuncionarioController);
FuncionarioRoutes.delete("/:id", deleteFuncionario);
FuncionarioRoutes.get("/", getAllFuncionario);
