import { Router } from "express";
import BancoRoutes from "./routes/BancoRoutes";
import { CarreiraRoutes } from "./routes/CarreiraRoutes";
import { CategoriaRoutes } from "./routes/CategoriaRoutes";
import { CompetenciaRoutes } from "./routes/CompetenciaRoutes";
import { DepartamentoRoutes } from "./routes/DepartamentoRoutes";
import { FichaAvaliacaoRoutes } from "./routes/FichaAvaliacaoRoutes";
import { FuncaoRoutes } from "./routes/FuncaoRoutes";
import { FuncionarioRoutes } from "./routes/FuncionarioRoutes";
import { PublicacaoRoutes } from "./routes/PublicacaoRoutes";
import { SubCarreiraRoutes } from "./routes/SubCarreirasRoutes";

const routes = Router();

routes.use("/funcao", FuncaoRoutes);
routes.use("/banco", BancoRoutes);
routes.use("/carreira", CarreiraRoutes);
routes.use("/categoria", CategoriaRoutes);
routes.use("/subcarreira", SubCarreiraRoutes);
routes.use("/funcionario", FuncionarioRoutes);
routes.use("/ficha-avaliacao", FichaAvaliacaoRoutes);
routes.use("/departamento", DepartamentoRoutes);
routes.use("/publicacao", PublicacaoRoutes);
routes.use("/competencia", CompetenciaRoutes);
export { routes };
