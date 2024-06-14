import { Router } from "express";
import {
  createSubCarreiraController,
  deleteSubCarreiraController,
  getbyIdSubCarreiraController,
} from "../controllers/Subcarreira/subCarreiraController";

export const SubCarreiraRoutes = Router();

SubCarreiraRoutes.post("/create-subcarreira", createSubCarreiraController);
SubCarreiraRoutes.get("/find/:id", getbyIdSubCarreiraController);
SubCarreiraRoutes.delete(
  "/delete-subcarreira/:id",
  deleteSubCarreiraController
);
