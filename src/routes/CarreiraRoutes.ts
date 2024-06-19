import { Router } from "express";
import {
  createCarreiraController,
  deleteCarreiraController,
  getbyIdCarreiraController,
  updateCarreiraController,
} from "../controllers/Carreira/CarreiraController";
import { getAllCarreira } from "../models/Carreira/listCarreira";

export const CarreiraRoutes = Router();

CarreiraRoutes.post("/create-carreira", createCarreiraController);
CarreiraRoutes.get("/find/:id", getbyIdCarreiraController);
CarreiraRoutes.delete("/delete-carreira/:id", deleteCarreiraController);
CarreiraRoutes.get("/getall-arreira", getAllCarreira);
CarreiraRoutes.put("/update-carreira/:id", updateCarreiraController);
