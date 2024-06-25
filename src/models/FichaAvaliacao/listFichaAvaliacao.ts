//Usuário listar funcionario

import { Request, Response } from "express";
import { prisma } from "../../database/db";

//listar Ficha Avaliacao
export const getAllFichaAvaliacao = async (req: Request, res: Response) => {
  const data = await prisma.fichaAvaliacao.findMany();

  return res.status(200).json(data);
};
