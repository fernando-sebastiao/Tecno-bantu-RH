import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { BancoSchema } from "../../utils/validateBanco";

//Usuário criar funcao
export const createBanco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Validar os dados com Zod
    const parseBanco = BancoSchema.safeParse(req.body);
    if (!parseBanco.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseBanco.error.errors.map((error) => error.message)
      );
    }
    //verificar se o Banco já existe
    const verificar = await prisma.banco.findFirst({
      where: { nome_banco: parseBanco.data.nome_banco },
    });
    if (verificar) {
      throw new CustomError("Bank already exists", 400, [
        "Este Banco já existe",
      ]);
    }
    //criando um novo Banco
    const dados = await prisma.banco.create({
      data: parseBanco.data,
    });

    return res.status(201).json({ massage: "Created Bank", dados });
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};

//Usuário listar Banco

export const getAllBanco = async (req: Request, res: Response) => {
  const data = await prisma.banco.findMany();

  return res.status(200).json(data);
};

//Usuário Consultar funcao
export const getbyIdBanco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const banco = await prisma.banco.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!banco) {
      throw new CustomError("Banco não encontrado", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }
    return res.status(200).json(banco);
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros;
  }
};
