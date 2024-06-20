import { Router } from "express";
import {
  createBanco,
  deleteBanco,
  getbyIdBanco,
  updateBancoController,
} from "../controllers/Banco/BancoController";
import { getAllBanco } from "../models/Banco/listBanco";

export const BancoRoutes = Router();

BancoRoutes.post("/create-banco", createBanco);
BancoRoutes.get("/getall-bancos", getAllBanco);
BancoRoutes.get("/find/:id", getbyIdBanco);
BancoRoutes.put("/update-banco/:id", updateBancoController);
BancoRoutes.delete("/delete/:id", deleteBanco);
