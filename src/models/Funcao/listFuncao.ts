//Usuário lista funcao

import { Request, Response } from "express";
import { prisma } from "../../database/db";

export const getAllFuncao = async (req: Request, res: Response) => {
  const data = await prisma.funcao.findMany();

  return res.status(200).json(data);
};
