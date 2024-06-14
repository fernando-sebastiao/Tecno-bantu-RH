import { Router } from "express";
import {
  createCategoriaController,
  deleteCategoria,
  getbyIdCategoria,
  updateCategoriaController,
} from "../controllers/Categoria/CategoriaController";
import { getAllCategoria } from "../models/Categoria/list";

export const CategoriaRoutes = Router();

CategoriaRoutes.post("/create-categoria", createCategoriaController);
CategoriaRoutes.get("/find/:id", getbyIdCategoria);
CategoriaRoutes.put("/updte-categoria", updateCategoriaController);
CategoriaRoutes.get("getallCategoria", getAllCategoria);
CategoriaRoutes.delete("/delete-categoria", deleteCategoria);
