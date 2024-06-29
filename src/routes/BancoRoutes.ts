import { Router } from "express";
import {
  FiltrarBancoController,
  createBanco,
  deleteBancoController,
  getbyIdBancoController,
  updateBancoController,
} from "../controllers/Banco/BancoController";
import { errorHandler } from "../middleware/errorHandler";
import { getAllBanco } from "../models/Banco/listBanco";
const BancoRoutes = Router();

BancoRoutes.post("/", createBanco);
BancoRoutes.get("/", getAllBanco);
BancoRoutes.get("/filter", FiltrarBancoController);
BancoRoutes.put("/:id", updateBancoController);
BancoRoutes.delete("/:id", deleteBancoController);
BancoRoutes.get("/:id", getbyIdBancoController);

BancoRoutes.use(errorHandler);

export default BancoRoutes;
