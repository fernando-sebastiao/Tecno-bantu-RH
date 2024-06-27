import { Router } from "express";
import {
  createBanco,
  deleteBanco,
  getbyIdBanco,
  updateBancoController,
} from "../controllers/Banco/BancoController";
import { getAllBanco } from "../models/Banco/listBanco";

export const BancoRoutes = Router();

BancoRoutes.post("/", createBanco);
BancoRoutes.get("/", getAllBanco);
BancoRoutes.get("/", getbyIdBanco);
BancoRoutes.put("/:id", updateBancoController);
BancoRoutes.delete("/:id", deleteBanco);
