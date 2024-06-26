import { Router } from "express";
import {
  createPublicacaoController,
  deletePublicacaoController,
  updatePublicacaoController,
} from "../controllers/Publicacao/publicacaoController";
import { getAllPublicacao } from "../models/Publicacao/listPublicacao";

export const PublicacaoRoutes = Router();

PublicacaoRoutes.post("/", createPublicacaoController);
PublicacaoRoutes.get("/", getAllPublicacao);
PublicacaoRoutes.delete("/:id", deletePublicacaoController);
PublicacaoRoutes.put("/:id", updatePublicacaoController);
