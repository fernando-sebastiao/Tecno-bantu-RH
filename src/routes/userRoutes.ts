import { Router } from "express";
import {
  createNacionalidade,
  getAllnacionalidades,
} from "../controllers/NacionaliadeController";

const NacionalidadeRoutes = Router();

NacionalidadeRoutes.post("/", createNacionalidade);
NacionalidadeRoutes.get("/", getAllnacionalidades);

export { NacionalidadeRoutes };
