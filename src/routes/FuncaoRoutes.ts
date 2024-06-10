import { Router } from "express";
import {
  createFuncao,
  getAllFuncao,
  getbyIdFuncao,
} from "../controllers/FuncaoController";

const FuncaoRoutes = Router();

FuncaoRoutes.post("/create-funcao", createFuncao);
FuncaoRoutes.get("/getallFuncao", getAllFuncao);
FuncaoRoutes.get("/find", getbyIdFuncao);

export { FuncaoRoutes };
