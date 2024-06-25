import { Router } from "express";
import {
  deleteCategoria,
  getbyIdCategoria,
  updateCategoriaController,
} from "../controllers/Categoria/CategoriaController";
import { createFuncionarioController } from "../controllers/Funcionario/funcionarioController";
import { getAllCategoria } from "../models/Categoria/list";

export const FuncionarioRoutes = Router();

FuncionarioRoutes.post("/", createFuncionarioController);
FuncionarioRoutes.get("/:id", getbyIdCategoria);
FuncionarioRoutes.put("/:id", updateCategoriaController);
FuncionarioRoutes.get("/", getAllCategoria);
FuncionarioRoutes.delete("/:id", deleteCategoria);
