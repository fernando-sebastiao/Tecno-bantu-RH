import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { CreateCarreira } from "../../models/Carreira/createCarreira";
import { CarreiraSchema } from "../../utils/validateCarreira";

export const createCarreiraController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //verificar a validação
    const parseCarreira = CarreiraSchema.safeParse(req.body);
    if (!parseCarreira.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseCarreira.error.errors.map((error) => error.message)
      );
    }
    //verificar se a carreira já existe
    const verificar = await prisma.carreira.findFirst({
      where: { nome_carreira: parseCarreira.data.nome_carreira },
    });
    if (verificar) {
      throw new CustomError("Bank already exists", 400, [
        "Esta Carreira já existe",
      ]);
    }
    const dados = await CreateCarreira(parseCarreira.data);
    return res.status(201).json({ massage: "Created Bank", dados });
  } catch (err) {
    next(err);
  }
};
