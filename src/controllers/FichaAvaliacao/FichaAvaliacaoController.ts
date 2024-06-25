import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { CreateFichaAvaliacao } from "../../models/FichaAvaliacao/createFichaAvaliacao";
import { destroyFichaAvaliacao } from "../../models/FichaAvaliacao/destroy";
import { ListarFichaAvaliacaoById } from "../../models/FichaAvaliacao/getallbyIdFichaAvaliacao";
import { FichaAvaliacaoSchema } from "../../utils/validateFichaAvaliacao";

export const createFichaAvaliacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //verificar a validação
    const parseFichaAvaliacao = FichaAvaliacaoSchema.safeParse(req.body);
    if (!parseFichaAvaliacao.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseFichaAvaliacao.error.errors.map((error) => error.message)
      );
    }
    //verificar se o nome da Ficha Avaliação já existe
    const verificar = await prisma.fichaAvaliacao.findFirst({
      where: { nome_ficha: parseFichaAvaliacao.data.nome_ficha },
    });
    if (verificar) {
      throw new CustomError("Esta Ficha de Avaliação já existe", 400, [
        "Este Ficha de Avaliação já existe",
      ]);
    }
    //criando a Ficha Avaliação
    const dados = await CreateFichaAvaliacao(parseFichaAvaliacao.data);
    return res
      .status(201)
      .json({ massage: "Ficha de Avaliação Criada!!", dados });
  } catch (err) {
    next(err);
  }
};

export const getbyIdFichaAvaliacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const avaliacao = await prisma.fichaAvaliacao.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!avaliacao) {
      throw new CustomError("Ficha de Avaliação não encontrada!", 400, [
        "Ficha de avaliação não encontrada!",
      ]);
    }
    const FichaAvaliacao = await ListarFichaAvaliacaoById(Number(id));
    return res.status(200).json(FichaAvaliacao);
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros;
  }
};

//Deletando Ficha de Avaliação
export const deleteFichaAvaliacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const fichaAvaliacao = await prisma.fichaAvaliacao.findFirst({
      where: { id: Number(id) },
    });

    if (!fichaAvaliacao) {
      throw new CustomError("Ficha de Avaliacao não encontrada", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Fazer o delete da fichaAvaliacao
    const dados = await destroyFichaAvaliacao(Number(id));

    return res.json({
      Error: false,
      message: "Ficha de Avaliação Deletada com sucesso",
      dados,
    });
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};
