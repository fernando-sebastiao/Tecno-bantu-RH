import { Router } from "express";
import { BancoRoutes } from "./routes/BancoRoutes";
import { CarreiraRoutes } from "./routes/CarreiraRoutes";
import { CategoriaRoutes } from "./routes/CategoriaRoutes";
import { FuncaoRoutes } from "./routes/FuncaoRoutes";
import { FuncionarioRoutes } from "./routes/FuncionarioRoutes";
import { SubCarreiraRoutes } from "./routes/SubCarreirasRoutes";

const routes = Router();

routes.use("/funcao", FuncaoRoutes);
routes.use("/banco", BancoRoutes);
routes.use("/carreira", CarreiraRoutes);
routes.use("/categoria", CategoriaRoutes);
routes.use("/subcarreira", SubCarreiraRoutes);
routes.use("/funcionario", FuncionarioRoutes);
export { routes };
