//Usuário listar Departamento

import { Request, Response } from "express";
import { prisma } from "../../database/db";

//listar SubCategorias
export const getAllDepartamento = async (req: Request, res: Response) => {
  const data = await prisma.departamento.findMany();

  return res.status(200).json(data);
};
