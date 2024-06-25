import { Router } from "express";
import {
  createFichaAvaliacaoController,
  deleteFichaAvaliacaoController,
  getbyIdFichaAvaliacaoController,
  updateFichaAvaliacaoController,
} from "../controllers/FichaAvaliacao/FichaAvaliacaoController";
import { getAllFichaAvaliacao } from "../models/FichaAvaliacao/listFichaAvaliacao";

const FichaAvaliacaoRoutes = Router();

FichaAvaliacaoRoutes.post("/", createFichaAvaliacaoController);
FichaAvaliacaoRoutes.get("/:id", getbyIdFichaAvaliacaoController);
FichaAvaliacaoRoutes.delete("/:id", deleteFichaAvaliacaoController);
FichaAvaliacaoRoutes.put("/:id", updateFichaAvaliacaoController);
FichaAvaliacaoRoutes.get("/", getAllFichaAvaliacao);
export { FichaAvaliacaoRoutes };
