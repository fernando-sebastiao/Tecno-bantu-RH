//Usuário listar Departamento

import { Request, Response } from "express";
import { prisma } from "../../database/db";

//listar SubCategorias
export const getAllDadosProfissionais = async (req: Request, res: Response) => {
  const data = await prisma.dadosProfissionais.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return res.status(200).json(data);
};
