import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";

export const GetallFuncionarioDepartamento = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const funcao = await prisma.departamento.findFirst({
      where: { id: Number(id) },
    });

    if (!funcao) {
      throw new CustomError(
        "Funcionário de Departamento não encontrado!",
        400,
        ["Funcionário de departamento não encontrado!"]
      );
    }

    // Fazer o gety all dos Funcionários do Departamento
    const dados = await prisma.departamento.findMany({
      where: {
        id: Number(id),
      },
      select: {
        funcionariodepartamento: {
          select: {
            Funcionario: {
              select: {
                id: true,
                nome_completo: true,
                nascimento: true,
                email: true,
                telefone1: true,
                genero: true,
                avatar: true,
                createdAt: true,
                Funcao: {
                  select: {
                    nome_funcao: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return res.status(200).json(dados);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
