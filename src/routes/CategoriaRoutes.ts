import { Router } from "express";
import {
  FiltrarCategoriaController,
  createCategoriaController,
  deleteCategoria,
  updateCategoriaController,
} from "../controllers/Categoria/CategoriaController";
import { getAllCategoria } from "../models/Categoria/list";

export const CategoriaRoutes = Router();

CategoriaRoutes.post("/", createCategoriaController);
CategoriaRoutes.get("/", FiltrarCategoriaController);
CategoriaRoutes.put("/:id", updateCategoriaController);
CategoriaRoutes.get("/all", getAllCategoria);
CategoriaRoutes.delete("/:id", deleteCategoria);
