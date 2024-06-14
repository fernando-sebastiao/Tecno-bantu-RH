import { Router } from "express";
import { BancoRoutes } from "./routes/BancoRoutes";
import { CarreiraRoutes } from "./routes/CarreiraRoutes";
import { CategoriaRoutes } from "./routes/CategoriaRoutes";
import { FuncaoRoutes } from "./routes/FuncaoRoutes";
import { SubCarreiraRoutes } from "./routes/SubCarreirasRoutes";

const routes = Router();

routes.use("/funcao", FuncaoRoutes);
routes.use("/banco", BancoRoutes);
routes.use("/carreira", CarreiraRoutes);
routes.use("/categoria", CategoriaRoutes);
routes.use("/SubCarreiras", SubCarreiraRoutes);
export { routes };
