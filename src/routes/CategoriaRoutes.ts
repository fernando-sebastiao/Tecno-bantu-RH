import { Router } from "express";
import {
  createCategoriaController,
  getbyIdCategoria,
  updateCategoriaController,
} from "../controllers/Categoria/CategoriaController";
import { getAllCategoria } from "../models/Categoria/list";

export const CategoriaRoutes = Router();

CategoriaRoutes.post("/create-categoria", createCategoriaController);
CategoriaRoutes.get("/find", getbyIdCategoria);
CategoriaRoutes.put("/updte-categoria", updateCategoriaController);
CategoriaRoutes.get("getallCategoria", getAllCategoria);
