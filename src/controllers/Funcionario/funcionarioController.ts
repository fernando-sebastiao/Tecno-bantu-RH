import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { CreateFuncionario } from "../../models/Funcionario/createFuncionario";
import { funcionarioSchema } from "../../utils/validateFuncionario";

export const createFuncionarioController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //verificar a validação
    const parseFuncionario = funcionarioSchema.safeParse(req.body);
    if (!parseFuncionario.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseFuncionario.error.errors.map((error) => error.message)
      );
    }
    //verificar se a carreira já existe
    const verificar = await prisma.funcionario.findFirst({
      where: { nome_completo: parseFuncionario.data.nome_completo },
    });
    if (verificar) {
      throw new CustomError("This Funcionario already exists", 400, [
        "Este Funcionario já existe",
      ]);
    }
    const dados = await CreateFuncionario(parseFuncionario.data);
    return res.status(201).json({ massage: "Created Funcionario!", dados });
  } catch (err) {
    next(err);
  }
};
