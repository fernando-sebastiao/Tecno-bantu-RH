import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { createCompetencia } from "../../models/Competencia/createCompetencia";
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
