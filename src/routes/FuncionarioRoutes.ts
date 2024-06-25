import { Router } from "express";

import { createFuncionarioController } from "../controllers/Funcionario/funcionarioController";

export const FuncionarioRoutes = Router();

FuncionarioRoutes.post("/", createFuncionarioController);
