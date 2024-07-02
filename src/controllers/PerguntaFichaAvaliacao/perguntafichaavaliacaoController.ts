import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { createPerguntaFichaAvaliacao } from "../../models/PerguntaFichaAvaliacao/createPergFichAvaliacao";
import { destroyPerguntaFichaAvaliacao } from "../../models/PerguntaFichaAvaliacao/destroy";
import {
  FiltrarPerFichaAvaliacao,
  PerguntaFichaAvaliacaoProps,
} from "../../models/PerguntaFichaAvaliacao/filter";
import { getbyIdPerguntaFichaAvaliacao } from "../../models/PerguntaFichaAvaliacao/getbyId";
import { UpdatePergFichaAvaliacao } from "../../models/PerguntaFichaAvaliacao/updatePergFichAvaliacao";
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

//atualizar pergunta ficha de avaliacao
export const updatePerguntaFichaAvaliacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    // Verificar se a Pergunta de Ficha de Avaliacao existe
    const verificar = await prisma.perguntaFichaAvaliacao.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!verificar) {
      throw new CustomError(
        "Pergunta de Ficha de Avaliação não encontrada!",
        400,
        ["Pergnta de Ficha de Avaliação não encontrada"]
      );
    }

    // Validar os dados
    const verificarDado = schemaPerguntaFichaAvaliacão.safeParse(req.body);

    if (!verificarDado.success) {
      //verificando erros
      throw new CustomError(
        "Erro de Validação",
        400,
        verificarDado.error.errors.map(
          (error) => `${error.path[0]}: ${error.message}`
        )
      );
    }

    // Atualizar os dados
    const dados = await UpdatePergFichaAvaliacao({
      id: Number(id),
      descricao: verificarDado.data.descricao,
      nivel_esperado: verificarDado.data.nivel_esperado,
      competenciaId: verificarDado.data.competenciaId,
      fichaAvaliacaoId: verificarDado.data.fichaAvaliacaoId,
    });

    return res.json({
      Error: false,
      message: "Pergunta de Ficha de Avaliação atualizado com sucesso!",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

//Deletando Pergunta de Ficha de Avaliação
export const deletePergFichaAvaliacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const perguntaFichaAvaliacao =
      await prisma.perguntaFichaAvaliacao.findFirst({
        where: { id: Number(id) },
      });

    if (!perguntaFichaAvaliacao) {
      throw new CustomError(
        "Pergunta de Ficha de Avaliação não encontrada!",
        400,
        ["Pergunta de Ficha de Avaliação não foi encontrado!"]
      );
    }
    // Fazer o delete
    const dados = await destroyPerguntaFichaAvaliacao(Number(id));

    return res.json({
      Error: false,
      message: "Pergunta de Ficha de Avaliação Deletada com sucesso!✔",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

//Usuário consultar Pergunta de Ficha de Avaliacao
export const getbyIdPergFichaAvaliacaoController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const verificar = await prisma.perguntaFichaAvaliacao.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!verificar) {
      throw new CustomError(
        "Pergunta de Ficha de Avaliação não encontrada!",
        400,
        ["Pergunta de Ficha de Avaliação não foi encontrada!"]
      );
    }
    //trazendo os dados
    const dados = await getbyIdPerguntaFichaAvaliacao(Number(id));
    return res.status(200).json(dados);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
//Filtrar Pergunta de Ficha de Avaliação
export const FiltrarPergFIchaAvaliacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as PerguntaFichaAvaliacaoProps;

    // Verificar se a busca retorna resultados
    const PerguntaFichaAvaliacao = await FiltrarPerFichaAvaliacao(query);
    if (PerguntaFichaAvaliacao.length === 0) {
      throw new CustomError(
        "Pergunta de Ficha de Avaliação não encontrada!",
        400,
        ["A Pergunta de Ficha de Avaliação não foi encontrado"]
      );
    }

    return res.status(200).json(PerguntaFichaAvaliacao);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
