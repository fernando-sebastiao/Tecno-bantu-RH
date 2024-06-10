import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { funcaoSchema } from "../../utils/validateFuncao";

//Usuário criar funcao
export const createFuncao = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Validar os dados com Zod
    const parseFuncao = funcaoSchema.safeParse(req.body);
    if (!parseFuncao.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseFuncao.error.errors.map((error) => error.message)
      );
    }
    //verificar se a funcao já existe
    const verificar = await prisma.funcao.findFirst({
      where: { nome_funcao: parseFuncao.data.nome_funcao },
    });
    if (verificar) {
      throw new CustomError("Esta função já existe", 400, [
        "Está função já existe",
      ]);
    }
    //criando uma nova Funcao
    const dados = await prisma.funcao.create({
      data: parseFuncao.data,
    });

    return res.status(201).json({ massage: "Created Function", dados });
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};

//Usuário lista funcao

export const getAllFuncao = async (req: Request, res: Response) => {
  const data = await prisma.funcao.findMany();

  return res.status(200).json(data);
};

//Usuário Consultar funcao
export const getbyIdFuncao = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const funcao = await prisma.funcao.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!funcao) {
      throw new CustomError("Usuário não encontrado", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }
    return res.status(200).json(funcao);
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros;
  }
};
//Usuario Deletar Função //
export const deleteFuncao = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const funcao = await prisma.funcao.findFirst({ where: { id: Number(id) } });

    if (!funcao) {
      throw new CustomError("Usuário não encontrado", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Fazer o delete da Função
    const dados = await prisma.funcao.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({
      Error: false,
      message: "Função Deletada com sucesso",
      dados,
    });
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};

//actualizar função
export const updateFuncao = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { nome_funcao } = req.body;

  try {
    // Verificar se a funcao existe
    const verificar = await prisma.funcao.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!verificar) {
      throw new CustomError("Função não encontrada", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Validar os dados
    const verificarDado = funcaoSchema.safeParse(req.body);

    if (!verificarDado.success) {
      // Filtrar especificamente o erro de nome_funcao.nonempty
      const nomeFuncaoError = verificarDado.error.errors.find(
        (error) =>
          error.path.includes("nome_funcao") &&
          error.message === "Os dados não pode ser enviados vázios!"
      );

      if (nomeFuncaoError) {
        throw new CustomError("Erro de Validação", 400, [
          nomeFuncaoError.message,
        ]);
      } else {
        // Se não for o erro de nome_funcao.nonempty, lançar todos os erros de validação
        throw new CustomError(
          "Erro de Validação",
          400,
          verificarDado.error.errors.map((error) => error.message)
        );
      }
    }

    // Atualizar os dados
    const dados = await prisma.funcao.update({
      where: {
        id: Number(id),
      },
      data: {
        nome_funcao: verificarDado.data.nome_funcao,
      },
    });

    return res.json({
      Error: false,
      message: "Função atualizada com sucesso",
      dados,
    });
  } catch (err) {
    next(err);
  }
};
