import { Router } from "express";
import { createNacionalidade } from "./controllers/UserController";

export const routes = Router();

routes.post("/create-nacionalidade", createNacionalidade);
