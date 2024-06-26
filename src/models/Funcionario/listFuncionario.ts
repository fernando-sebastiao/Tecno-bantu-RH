//Usuário listar funcionario

import { Request, Response } from "express";
import { prisma } from "../../database/db";

//listar funcionario
export const getAllFuncionario = async (req: Request, res: Response) => {
  const data = await prisma.funcionario.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return res.status(200).json(data);
};
