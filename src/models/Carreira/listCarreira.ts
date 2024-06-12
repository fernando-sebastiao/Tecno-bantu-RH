//Usuário listar Carreira

import { Request, Response } from "express";
import { prisma } from "../../database/db";

//listar Carreiras
export const getAllCarreira = async (req: Request, res: Response) => {
  const data = await prisma.carreira.findMany();

  return res.status(200).json(data);
};
