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
    //verificar se a função existe
    const verificarFuncao = await prisma.funcao.findFirst({
      where: {
        id: parseFuncionario.data.id_funcao,
      },
    });
    if (!verificarFuncao) {
      throw new CustomError("Esta Função não existe!", 400, [
        "Esta Função não existe",
      ]);
    }
    //verificar se o banco existe
    const verificarBanco = await prisma.banco.findFirst({
      where: {
        id: parseFuncionario.data.Id_banco,
      },
    });
    if (!verificarBanco) {
      throw new CustomError("Este Banco não existe!", 400, [
        "Esta Banco não existe!",
      ]);
    }
    //verificar se a categoria existe
    const verificarCategoria = await prisma.categoriaRH.findFirst({
      where: {
        id: parseFuncionario.data.id_categoria,
      },
    });
    if (!verificarCategoria) {
      throw new CustomError("Esta Categria não existe!", 400, [
        "Esta Categoria não existe!",
      ]);
    }
    const dados = await CreateFuncionario(parseFuncionario.data);
    return res.status(201).json({ massage: "Created Funcionario!", dados });
  } catch (err) {
    next(err);
  }
};
