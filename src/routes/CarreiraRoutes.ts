import { Router } from "express";
import { createCarreiraController } from "../controllers/Carreira/CarreiraController";

export const CarreiraRoutes = Router();

CarreiraRoutes.post("/create-carreira", createCarreiraController);
