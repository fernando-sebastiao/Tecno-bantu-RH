import { Router } from "express";
import {
  createCategoriaController,
  deleteCategoria,
  getbyIdCategoria,
  updateCategoriaController,
} from "../controllers/Categoria/CategoriaController";
import { getAllCategoria } from "../models/Categoria/list";

export const CategoriaRoutes = Router();

CategoriaRoutes.post("/", createCategoriaController);
CategoriaRoutes.get("/:id", getbyIdCategoria);
CategoriaRoutes.put("/:id", updateCategoriaController);
CategoriaRoutes.get("/", getAllCategoria);
CategoriaRoutes.delete("/:id", deleteCategoria);
