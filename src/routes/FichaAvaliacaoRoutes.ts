import { Router } from "express";
import {
  createFichaAvaliacaoController,
  deleteFichaAvaliacaoController,
  getbyIdFichaAvaliacaoController,
  updateFichaAvaliacaoController,
} from "../controllers/FichaAvaliacao/FichaAvaliacaoController";

const FichaAvaliacaoRoutes = Router();

FichaAvaliacaoRoutes.post("/", createFichaAvaliacaoController);
FichaAvaliacaoRoutes.get("/:id", getbyIdFichaAvaliacaoController);
FichaAvaliacaoRoutes.delete("/:id", deleteFichaAvaliacaoController);
FichaAvaliacaoRoutes.put("/:id", updateFichaAvaliacaoController);
export { FichaAvaliacaoRoutes };
