import { Router } from "express";
import {
  FiltrarFuncaoController,
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
FuncaoRoutes.get("/filter", FiltrarFuncaoController);
FuncaoRoutes.delete("/:id", deleteFuncaoController);
FuncaoRoutes.put("/:id", updateFuncaoController);
export { FuncaoRoutes };
