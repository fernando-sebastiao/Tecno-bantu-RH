import { Router } from "express";
import {
  createSubCarreiraController,
  deleteSubCarreiraController,
  getbyIdSubCarreiraController,
  updateSubCarreiraController,
} from "../controllers/Subcarreira/subCarreiraController";
import { getAllSubCarreiras } from "../models/SubCarreira/list";

export const SubCarreiraRoutes = Router();

SubCarreiraRoutes.post("/create-subcarreira", createSubCarreiraController);
SubCarreiraRoutes.get("/find/:id", getbyIdSubCarreiraController);
SubCarreiraRoutes.delete(
  "/delete-subcarreira/:id",
  deleteSubCarreiraController
);
SubCarreiraRoutes.put("/update-subcarreira/:id", updateSubCarreiraController);
SubCarreiraRoutes.get("/getall-subcarreiras", getAllSubCarreiras);
