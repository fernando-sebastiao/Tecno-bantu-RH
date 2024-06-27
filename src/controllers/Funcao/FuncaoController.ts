import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { UpdateFuncao } from "../../models/Funcao/UpdateFuncao";
import { CreateFuncao } from "../../models/Funcao/createFuncao";
import { destroyFuncao } from "../../models/Funcao/destroy";
import { FiltrarFuncao, FuncaoProps } from "../../models/Funcao/FiltrarFuncao";
import { funcaoSchema } from "../../utils/Validations/validateFuncao";

//Usuário criar funcao
export const createFuncaoController = async (
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
    const dados = await CreateFuncao(parseFuncao.data);

    return res.status(201).json({ massage: "Created Function", dados });
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};

//Usuário Consultar funcao
export const getbyIdFuncaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as FuncaoProps;
    //verificar se existe
    const dados = await FiltrarFuncao(query);
    if (dados.length === 0) {
      throw new CustomError("Banco não encontrado", 400, [
        "O Banco não foi encontrado",
      ]);
    }
    return res.status(200).json(dados);
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros;
  }
};
//Usuario Deletar Função //
export const deleteFuncaoController = async (
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
    const dados = await destroyFuncao(Number(id));

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

export const updateFuncaoController = async (
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
    const dados = await UpdateFuncao({
      id: Number(id),
      nome_funcao: verificarDado.data.nome_funcao,
    });

    res.json(dados);
  } catch (err) {
    next(err);
  }
};
