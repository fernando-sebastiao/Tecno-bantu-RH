//Usuário listar Competencia

import { Request, Response } from "express";
import { prisma } from "../../database/db";

//listar Competencia
export const getAllCompetencia = async (req: Request, res: Response) => {
  const data = await prisma.competencia.findMany({ orderBy: { id: "asc" } });
  return res.status(200).json(data);
};
