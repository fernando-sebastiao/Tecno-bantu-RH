import { Router } from "express";
import {
  createFichaAvaliacaoController,
  deleteFichaAvaliacaoController,
  getbyIdFichaAvaliacaoController,
} from "../controllers/FichaAvaliacao/FichaAvaliacaoController";

const FichaAvaliacaoRoutes = Router();

FichaAvaliacaoRoutes.post("/", createFichaAvaliacaoController);
FichaAvaliacaoRoutes.get("/:id", getbyIdFichaAvaliacaoController);
FichaAvaliacaoRoutes.delete("/:id", deleteFichaAvaliacaoController);

export { FichaAvaliacaoRoutes };
