import { Router } from "express";
import {
  FiltrarCategoriaController,
  createCategoriaController,
  deleteCategoria,
  getbyIdCategoriaController,
  updateCategoriaController,
} from "../controllers/Categoria/CategoriaController";
import { getAllCategoria } from "../models/Categoria/list";

export const CategoriaRoutes = Router();

CategoriaRoutes.post("/", createCategoriaController);
CategoriaRoutes.get("/filter", FiltrarCategoriaController);
CategoriaRoutes.put("/:id", updateCategoriaController);
CategoriaRoutes.get("/", getAllCategoria);
CategoriaRoutes.delete("/:id", deleteCategoria);
CategoriaRoutes.get("/:id", getbyIdCategoriaController);
