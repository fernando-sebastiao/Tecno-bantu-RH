import { Router } from "express";
import {
  createCarreiraController,
  deleteCarreiraController,
  getbyIdCarreiraController,
  updateCarreiraController,
} from "../controllers/Carreira/CarreiraController";
import { getAllCarreira } from "../models/Carreira/listCarreira";

export const CarreiraRoutes = Router();

CarreiraRoutes.post("/", createCarreiraController);
CarreiraRoutes.get("/:id", getbyIdCarreiraController);
CarreiraRoutes.delete("/:id", deleteCarreiraController);
CarreiraRoutes.get("/dados", getAllCarreira);
CarreiraRoutes.put("/:id", updateCarreiraController);
