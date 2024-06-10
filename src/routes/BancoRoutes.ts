import { Router } from "express";
import {
  createBanco,
  getAllBanco,
  getbyIdBanco,
  updateBanco,
} from "../controllers/Banco/BancoController";

export const BancoRoutes = Router();

BancoRoutes.post("/create-banco", createBanco);
BancoRoutes.get("/getallBanco", getAllBanco);
BancoRoutes.get("/find/:id", getbyIdBanco);
BancoRoutes.put("/update-banco/:id", updateBanco);
