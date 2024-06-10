import { Router } from "express";
import {
  createFuncao,
  deleteFuncao,
  getAllFuncao,
  getbyIdFuncao,
  updateFuncao,
} from "../controllers/Funcao/FuncaoController";

const FuncaoRoutes = Router();

FuncaoRoutes.post("/create-funcao", createFuncao);
FuncaoRoutes.get("/getallFuncao", getAllFuncao);
FuncaoRoutes.get("/find/:id", getbyIdFuncao);
FuncaoRoutes.delete("/delete-funcao/:id", deleteFuncao);
FuncaoRoutes.put("/update-funcao/:id", updateFuncao);
export { FuncaoRoutes };
