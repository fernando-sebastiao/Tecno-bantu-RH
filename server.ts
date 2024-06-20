import cors from "cors";
import express, { Request, Response } from "express";
import { prisma } from "./src/database/db";
import { errorHandler } from "./src/middleware/errorHandler";
import { routes } from "./src/routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Server running so well! 🔥" });
});
const PORT = 8009;

const server = app.listen(PORT, () => {
  try {
    console.log(`⚡ Server running on PORT ${PORT}✔`);
  } catch (err) {
    console.log(err);
  }
});

const close = () => {
  server.close(async () => {
    console.log("Parando serviço");
    await prisma.$disconnect();
    console.log("A conexão com o banco de dados foi finalizada");
  });
};

process.on("SIGINT", close);

app.use(errorHandler);
