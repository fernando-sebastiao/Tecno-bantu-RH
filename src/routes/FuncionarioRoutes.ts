import { Router } from "express";

import {
  createFuncionarioController,
  deleteFuncionario,
  getbyIdFuncionarioController,
  updateFuncionarioController,
} from "../controllers/Funcionario/funcionarioController";
import { getAllFuncionario } from "../models/Funcionario/listFuncionario";

export const FuncionarioRoutes = Router();

FuncionarioRoutes.post("/", createFuncionarioController);
FuncionarioRoutes.put("/:id", updateFuncionarioController);
FuncionarioRoutes.get("/", getbyIdFuncionarioController);
FuncionarioRoutes.delete("/:id", deleteFuncionario);
FuncionarioRoutes.get("/all", getAllFuncionario);
