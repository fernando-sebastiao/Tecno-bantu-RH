import { Router } from "express";

import {
  FiltrarFuncionarioController,
  createFuncionarioController,
  deleteFuncionario,
  updateFuncionarioController,
} from "../controllers/Funcionario/funcionarioController";
import { getAllFuncionario } from "../models/Funcionario/listFuncionario";

export const FuncionarioRoutes = Router();

FuncionarioRoutes.post("/", createFuncionarioController);
FuncionarioRoutes.put("/:id", updateFuncionarioController);
FuncionarioRoutes.get("/", FiltrarFuncionarioController);
FuncionarioRoutes.delete("/:id", deleteFuncionario);
FuncionarioRoutes.get("/all", getAllFuncionario);
