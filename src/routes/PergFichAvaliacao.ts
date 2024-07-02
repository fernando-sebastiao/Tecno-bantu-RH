import { Router } from "express";
import { createPerguntaFichaAvaliacaoController } from "../controllers/PerguntaFichaAvaliacao/perguntafichaavaliacao";

export const PerguntaFichaAvaliacaoRoutes = Router();

PerguntaFichaAvaliacaoRoutes.post("/", createPerguntaFichaAvaliacaoController);
