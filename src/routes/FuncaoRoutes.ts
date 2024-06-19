import { Router } from "express";
import {
  createFuncaoController,
  deleteFuncaoController,
  getbyIdFuncaoController,
  updateFuncaoController,
} from "../controllers/Funcao/FuncaoController";
import { getAllFuncao } from "../models/Funcao/listFuncao";

const FuncaoRoutes = Router();

FuncaoRoutes.post("/create-funcao", createFuncaoController);
FuncaoRoutes.get("/getall-funcao", getAllFuncao);
FuncaoRoutes.get("/find/:id", getbyIdFuncaoController);
FuncaoRoutes.delete("/delete-funcao/:id", deleteFuncaoController);
FuncaoRoutes.put("/update-funcao/:id", updateFuncaoController);
export { FuncaoRoutes };
