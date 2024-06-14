import { Router } from "express";
import {
  createCategoriaController,
  getbyIdCategoria,
  updateCategoriaController,
} from "../controllers/Categoria/CategoriaController";

export const CategoriaRoutes = Router();

CategoriaRoutes.post("/create-categoria", createCategoriaController);
CategoriaRoutes.get("/find", getbyIdCategoria);
CategoriaRoutes.put("/updte-categoria", updateCategoriaController);
