//Usuário listar Banco

import { Request, Response } from "express";
import { prisma } from "../../database/db";

export const getAllBanco = async (req: Request, res: Response) => {
  const data = await prisma.banco.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return res.status(200).json(data);
};
