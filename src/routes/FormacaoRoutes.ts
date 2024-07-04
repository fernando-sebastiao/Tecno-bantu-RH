import { Router } from "express";
import {
  createFormacaoController,
  deleteFormacaoController,
  getbyIdFormacaoController,
  updateFormacaoController,
} from "../controllers/Formacao/formacaoController";
import { getAllFormacao } from "../models/Formacao/list";

export const FormacaoRoutes = Router();

FormacaoRoutes.post("/", createFormacaoController);
FormacaoRoutes.put("/:id", updateFormacaoController);
FormacaoRoutes.get("/:id", getbyIdFormacaoController);
FormacaoRoutes.get("/", getAllFormacao);
FormacaoRoutes.delete("/:id", deleteFormacaoController);
