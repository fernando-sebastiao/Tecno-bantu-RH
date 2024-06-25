import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { CreateFichaAvaliacao } from "../../models/FichaAvaliacao/createFichaAvaliacao";
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
