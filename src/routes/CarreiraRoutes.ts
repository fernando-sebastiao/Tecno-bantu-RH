import { Router } from "express";
import {
  createCarreiraController,
  deleteCarreiraController,
  getbyIdCarreiraController,
} from "../controllers/Carreira/CarreiraController";
import { updateCarreira } from "../models/Carreira/UpdateCarreira";
import { getAllCarreira } from "../models/Carreira/listCarreira";

export const CarreiraRoutes = Router();

CarreiraRoutes.post("/create-carreira", createCarreiraController);
CarreiraRoutes.get("/find/:id", getbyIdCarreiraController);
CarreiraRoutes.delete("/delete-carreira/:id", deleteCarreiraController);
CarreiraRoutes.get("/getallCarreira", getAllCarreira);
CarreiraRoutes.put("/update-carreira", updateCarreira);
