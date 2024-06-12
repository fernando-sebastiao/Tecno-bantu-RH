import { Router } from "express";
import { BancoRoutes } from "./routes/BancoRoutes";
import { CarreiraRoutes } from "./routes/CarreiraRoutes";
import { FuncaoRoutes } from "./routes/FuncaoRoutes";

const routes = Router();

routes.use("/funcao", FuncaoRoutes);
routes.use("/banco", BancoRoutes);
routes.use("/carreira", CarreiraRoutes);
export { routes };
