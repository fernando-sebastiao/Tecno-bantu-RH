import { Router } from "express";
import { createBanco } from "../controllers/Banco/BancoController";

export const BancoRoutes = Router();

BancoRoutes.post("/create-banco", createBanco);
