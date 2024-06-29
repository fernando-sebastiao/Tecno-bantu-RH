import { Router } from "express";
import {
  FiltrarFuncaoController,
  createFuncaoController,
  deleteFuncaoController,
  updateFuncaoController,
} from "../controllers/Funcao/FuncaoController";
import { getAllFuncao } from "../models/Funcao/listFuncao";

const FuncaoRoutes = Router();

FuncaoRoutes.post("/", createFuncaoController);
FuncaoRoutes.get("/all", getAllFuncao);
FuncaoRoutes.get("/", FiltrarFuncaoController);
FuncaoRoutes.delete("/:id", deleteFuncaoController);
FuncaoRoutes.put("/:id", updateFuncaoController);
export { FuncaoRoutes };
