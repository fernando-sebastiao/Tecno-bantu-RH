import { Router } from "express";
import { createNacionalidade } from "./controllers/UserController";

export const router = Router();

router.post("/create-nacionalidade", createNacionalidade);
