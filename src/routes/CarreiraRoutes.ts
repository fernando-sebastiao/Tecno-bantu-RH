import { Router } from "express";
import {
  FiltrarCarreiraController,
  createCarreiraController,
  deleteCarreiraController,
  updateCarreiraController,
} from "../controllers/Carreira/CarreiraController";
import { getAllCarreira } from "../models/Carreira/listCarreira";

export const CarreiraRoutes = Router();

CarreiraRoutes.post("/", createCarreiraController);
CarreiraRoutes.get("/", FiltrarCarreiraController);
CarreiraRoutes.delete("/:id", deleteCarreiraController);
CarreiraRoutes.get("/all", getAllCarreira);
CarreiraRoutes.put("/:id", updateCarreiraController);
