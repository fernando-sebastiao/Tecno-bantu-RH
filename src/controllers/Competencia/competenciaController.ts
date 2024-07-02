import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { createCompetencia } from "../../models/Competencia/createCompetencia";
import { destroyCompetencia } from "../../models/Competencia/destroy";
import {
  CompetenciaProps,
  FiltrarCompetencia,
} from "../../models/Competencia/filter";
import { getbyIdCompetencia } from "../../models/Competencia/getbyId";
import { updateCompetencia } from "../../models/Competencia/updateCompetencia";
import { competenciaSchema } from "../../utils/Validations/validateCompetencia";

export const createCompetenciaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Validar os dados com Zod
    const parseCompetencia = competenciaSchema.safeParse(req.body);
    if (!parseCompetencia.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseCompetencia.error.errors.map(
          (error) => `${error.path[0]}: ${error.message}`
        )
      );
    }
    //verificar se a competencia já existe
    const verificar = await prisma.competencia.findFirst({
      where: { nome_competencia: parseCompetencia.data.nome_competencia },
    });
    if (verificar) {
      throw new CustomError("This Competencia already exists", 400, [
        "Esta Competência já existe!",
      ]);
    }
    //criando uma nova competencia
    const competencia = await createCompetencia(parseCompetencia.data);

    return res
      .status(201)
      .json({ massage: "Competencia criada!", competencia });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

//Atualizar Competencia
export const updateCompetenciaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { nome_competencia, criterio } = req.body;

  try {
    // Validar os dados
    const verificarDado = competenciaSchema.safeParse(req.body);

    if (!verificarDado.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        verificarDado.error.errors.map(
          (error) => `${error.path[0]}: ${error.message}`
        )
      );
    }

    // Atualizar os dados
    const dados = await updateCompetencia({
      id: Number(id),
      nome_competencia: verificarDado.data.nome_competencia,
      criterio: verificarDado.data.criterio,
    });

    return res.json({
      Error: false,
      message: "Competencia atualizada com sucesso ✔",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

//consultar competencia
export const getbyIdCompetenciaController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const verificar = await prisma.competencia.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!verificar) {
      throw new CustomError("Competência não encontrada!", 400, [
        "A Competência não foi encontrada!",
      ]);
    }
    //trazendo os dados
    const dados = await getbyIdCompetencia(Number(id));
    return res.status(200).json(dados);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

//Usuario Deletar Competencia
export const deleteCompetenciaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const categoria = await prisma.categoriaRH.findFirst({
      where: { id: Number(id) },
    });

    if (!categoria) {
      throw new CustomError("Categoria não encontrada", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Fazer o delete da Competencia
    const dados = await destroyCompetencia(Number(id));

    return res.json({
      Error: false,
      message: "Competência Deletada com sucesso!✔",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

//Filtrar Competencia
export const FiltrarCategoriaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as CompetenciaProps;
    const categoria = await FiltrarCompetencia(query);
    if (categoria.length === 0) {
      throw new CustomError("Competência não encontrada!", 400, [
        "Competência não encontrada!",
      ]);
    }
    return res.status(200).json(categoria);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
