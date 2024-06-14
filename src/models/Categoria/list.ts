//Usuário listar Categoria

import { Request, Response } from "express";
import { prisma } from "../../database/db";

//listar Categorias
export const getAllCategoria = async (req: Request, res: Response) => {
  const data = await prisma.categoriaRH.findMany();

  return res.status(200).json(data);
};
