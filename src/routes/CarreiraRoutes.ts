import { Router } from "express";
import {
  createCarreiraController,
  deleteCarreiraController,
  getbyIdCarreiraController,
} from "../controllers/Carreira/CarreiraController";
import { getAllCarreira } from "../models/Carreira/listCarreira";

export const CarreiraRoutes = Router();

CarreiraRoutes.post("/create-carreira", createCarreiraController);
CarreiraRoutes.get("/find/:id", getbyIdCarreiraController);
CarreiraRoutes.get("/delete-carreira/:id", deleteCarreiraController);
CarreiraRoutes.get("/getallCarreira", getAllCarreira);
