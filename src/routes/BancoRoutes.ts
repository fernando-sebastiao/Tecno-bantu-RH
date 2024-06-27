import { Router } from "express";
import {
  createBanco,
  deleteBanco,
  getbyIdBanco,
  updateBancoController,
} from "../controllers/Banco/BancoController";
import { errorHandler } from "../middleware/errorHandler";
import { getAllBanco } from "../models/Banco/listBanco";
const BancoRoutes = Router();

BancoRoutes.post("/", createBanco);
BancoRoutes.get("/all", getAllBanco);
BancoRoutes.get("/", getbyIdBanco);
BancoRoutes.put("/:id", updateBancoController);
BancoRoutes.delete("/:id", deleteBanco);

BancoRoutes.use(errorHandler);

export default BancoRoutes;
