import { Router } from "express";
import { BancoRoutes } from "./routes/BancoRoutes";
import { FuncaoRoutes } from "./routes/FuncaoRoutes";

const routes = Router();

routes.use("/funcao", FuncaoRoutes);
routes.use("/banco", BancoRoutes);

export { routes };
