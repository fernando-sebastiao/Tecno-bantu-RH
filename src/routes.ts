import { Router } from "express";
import { NacionalidadeRoutes } from "./routes/userRoutes";

const routes = Router();

routes.use("/nacionalidade", NacionalidadeRoutes);

export { routes };
