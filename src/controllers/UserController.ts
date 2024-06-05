import { Request, Response } from "express";
import { prisma } from "../database/db";

export const createNacionalidade = async (req: Request, res: Response) => {
  const name = req.body?.name;

  const dados = prisma.nacionalidade.create({
    data: {
      name,
    },
  });
  return res
    .status(200)
    .json({ message: "Nacionalidade criada com sucesso", dados });
};
