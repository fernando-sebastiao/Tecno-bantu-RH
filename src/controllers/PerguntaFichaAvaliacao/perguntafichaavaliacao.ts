import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { createPerguntaFichaAvaliacao } from "../../models/PerguntaFichaAvaliacao/createPergFichAvaliacao";
import { schemaPerguntaFichaAvaliacão } from "../../utils/Validations/validatePerguntaFichaAvaliacao";

export const createPerguntaFichaAvaliacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //verificar a validação
    const parsePerguntaFichaAvaliacao = schemaPerguntaFichaAvaliacão.safeParse(
      req.body
    );
    if (!parsePerguntaFichaAvaliacao.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parsePerguntaFichaAvaliacao.error.errors.map(
          (error) => `${error.path[0]}: ${error.message}`
        )
      );
    }
    //verificar se a competencia existe
    const verificarCompetencia = await prisma.competencia.findFirst({
      where: {
        id: parsePerguntaFichaAvaliacao.data.competenciaId,
      },
    });
    if (!verificarCompetencia) {
      throw new CustomError("Esta Competência não existe!", 400, [
        "Esta Competência não existe!",
      ]);
    }
    //verificar se a Ficha avaliacao existe
    const verificarFichaAvaliacao = await prisma.fichaAvaliacao.findFirst({
      where: {
        id: parsePerguntaFichaAvaliacao.data.fichaAvaliacaoId,
      },
    });
    if (!verificarFichaAvaliacao) {
      throw new CustomError("Esta Funcionário não existe!", 400, [
        "Este Funcionário Supervisor não existe!",
      ]);
    }
    //criando Pergunta de ficha de avaliacao
    const dados = await createPerguntaFichaAvaliacao(
      parsePerguntaFichaAvaliacao.data
    );
    return res.status(201).json({
      massage: "Pergunta de Ficha de Avaliação criada com sucesso!✔",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
