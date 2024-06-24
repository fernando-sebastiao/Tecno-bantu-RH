import { Router } from "express";
import {
  createFuncaoController,
  deleteFuncaoController,
  getbyIdFuncaoController,
  updateFuncaoController,
} from "../controllers/Funcao/FuncaoController";
import { getAllFuncao } from "../models/Funcao/listFuncao";

const FuncaoRoutes = Router();

FuncaoRoutes.post("/", createFuncaoController);
FuncaoRoutes.get("/", getAllFuncao);
FuncaoRoutes.get("/:id", getbyIdFuncaoController);
FuncaoRoutes.delete("/:id", deleteFuncaoController);
FuncaoRoutes.put("/:id", updateFuncaoController);
export { FuncaoRoutes };
