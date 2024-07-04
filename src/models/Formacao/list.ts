//Usuário lista Formação

import { Request, Response } from "express";
import { prisma } from "../../database/db";

export const getAllFormacao = async (req: Request, res: Response) => {
  const data = await prisma.formacoes.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return res.status(200).json(data);
};
