import { Router } from "express";
import {
  FiltrarPergFIchaAvaliacaoController,
  createPerguntaFichaAvaliacaoController,
  deletePergFichaAvaliacaoController,
  getbyIdPergFichaAvaliacaoController,
  updatePerguntaFichaAvaliacaoController,
} from "../controllers/PerguntaFichaAvaliacao/perguntafichaavaliacaoController";
import { getAllPerguntaFichaAvaliacao } from "../models/PerguntaFichaAvaliacao/list";

export const PerguntaFichaAvaliacaoRoutes = Router();

PerguntaFichaAvaliacaoRoutes.post("/", createPerguntaFichaAvaliacaoController);
PerguntaFichaAvaliacaoRoutes.get("/", getAllPerguntaFichaAvaliacao);
PerguntaFichaAvaliacaoRoutes.put(
  "/:id",
  updatePerguntaFichaAvaliacaoController
);
PerguntaFichaAvaliacaoRoutes.delete("/:id", deletePergFichaAvaliacaoController);
PerguntaFichaAvaliacaoRoutes.get("/:id", getbyIdPergFichaAvaliacaoController);
PerguntaFichaAvaliacaoRoutes.get(
  "/filter",
  FiltrarPergFIchaAvaliacaoController
);
