import { Router } from "express";

import {
  createFuncionarioController,
  updateFuncionarioController,
} from "../controllers/Funcionario/funcionarioController";

export const FuncionarioRoutes = Router();

FuncionarioRoutes.post("/", createFuncionarioController);
FuncionarioRoutes.put("/:id", updateFuncionarioController);
