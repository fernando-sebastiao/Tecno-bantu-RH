import { Router } from "express";
import { createCategoriaController } from "../controllers/Categoria/CategoriaController";

export const CategoriaRoutes = Router();

CategoriaRoutes.post("/create-categoria", createCategoriaController);
