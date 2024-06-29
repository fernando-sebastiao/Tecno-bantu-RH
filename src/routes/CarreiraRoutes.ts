import { Router } from "express";
import {
  FiltrarCarreiraController,
  createCarreiraController,
  deleteCarreiraController,
  getbyIdCarreiraController,
  updateCarreiraController,
} from "../controllers/Carreira/CarreiraController";
import { getAllCarreira } from "../models/Carreira/listCarreira";

export const CarreiraRoutes = Router();

CarreiraRoutes.post("/", createCarreiraController);
CarreiraRoutes.get("/filter", FiltrarCarreiraController);
CarreiraRoutes.get("/:id", getbyIdCarreiraController);
CarreiraRoutes.delete("/:id", deleteCarreiraController);
CarreiraRoutes.get("/", getAllCarreira);
CarreiraRoutes.put("/:id", updateCarreiraController);
