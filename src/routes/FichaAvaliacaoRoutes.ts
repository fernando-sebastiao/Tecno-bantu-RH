import { Router } from "express";
import { createFichaAvaliacaoController } from "../controllers/FichaAvaliacao/FichaAvaliacaoController";

const FichaAvaliacaoRoutes = Router();

FichaAvaliacaoRoutes.post("/", createFichaAvaliacaoController);
// FichaAvaliacaoRoutes.get("/", getAllFuncao);
// FichaAvaliacaoRoutes.get("/:id", getbyIdFuncaoController);
// FichaAvaliacaoRoutes.delete("/:id", deleteFuncaoController);
// FichaAvaliacaoRoutes.put("/:id", updateFuncaoController);
export { FichaAvaliacaoRoutes };
