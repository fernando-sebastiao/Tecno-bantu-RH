import { Router } from "express";

import {
  createFuncionarioController,
  deleteFuncionario,
  getbyIdFuncionarioController,
  updateFuncionarioController,
} from "../controllers/Funcionario/funcionarioController";

export const FuncionarioRoutes = Router();

FuncionarioRoutes.post("/", createFuncionarioController);
FuncionarioRoutes.put("/:id", updateFuncionarioController);
FuncionarioRoutes.get("/:id", getbyIdFuncionarioController);
FuncionarioRoutes.delete("/:id", deleteFuncionario);
