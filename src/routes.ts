import { Router } from "express";
import { FuncaoRoutes } from "./routes/FuncaoRoutes";

const routes = Router();

routes.use("/funcao", FuncaoRoutes);

export { routes };
