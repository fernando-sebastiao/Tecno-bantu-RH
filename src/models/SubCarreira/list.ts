//Usuário listar Categoria

import { Request, Response } from "express";
import { prisma } from "../../database/db";

//listar SubCategorias
export const getAllSubCarreiras = async (req: Request, res: Response) => {
  const data = await prisma.subCarreira.findMany({
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
      nome_SubCarreira: true,
      Carreira: true,
    },
  });

  return res.status(200).json(data);
};
