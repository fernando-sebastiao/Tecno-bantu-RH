import { Router } from "express";
import { createSubCarreiraController } from "../controllers/Subcarreira/subCarreiraController";

export const SubCarreiraRoutes = Router();

SubCarreiraRoutes.post("/create-subcarreira", createSubCarreiraController);
