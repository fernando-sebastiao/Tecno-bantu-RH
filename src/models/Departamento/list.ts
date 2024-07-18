//Usuário listar Departamento

import { Request, Response } from "express";
import { prisma } from "../../database/db";

//listar SubCategorias
export const getAllDepartamento = async (req: Request, res: Response) => {
  const data = await prisma.departamento.findMany({
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
      nome_departamento: true,
      funcionario_chefe: {
        select: {
          id: true,
          nome_completo: true,
          avatar: true,
          createdAt: true,
          Funcao: {
            select: {
              nome_funcao: true,
            },
          },
        },
      },
      funcionario_supervisor: {
        select: {
          id: true,
          nome_completo: true,
          avatar: true,
          bairro: true,
          createdAt: true,
          Funcao: {
            select: {
              nome_funcao: true,
            },
          },
        },
      },
      _count: {
        select: {
          funcionariodepartamento: true,
        },
      },
      createdAt: true,
    },
  });

  return res.status(200).json(data);
};
