//Usuário listar Funcionários de Departamentos

import { Request, Response } from "express";
import { prisma } from "../../database/db";

//listar funcionario de departamentos
export const getAllFuncionarioDepartamento = async (
  req: Request,
  res: Response
) => {
  const data = await prisma.funcionarioDepartamento.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return res.status(200).json(data);
};
