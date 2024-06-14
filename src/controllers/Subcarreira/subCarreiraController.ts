import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { CreateSubcarreira } from "../../models/SubCarreira/createSubCarreira";
import { SubCarreiraSchema } from "../../utils/validateSubCarreira";

//Usuário criar subCarreira
export const createSubCarreiraController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Validar os dados com Zod
    const parseSubCarreira = SubCarreiraSchema.safeParse(req.body);
    if (!parseSubCarreira.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseSubCarreira.error.errors.map((error) => error.message)
      );
    }
    //verficar se a subCarreira já existe
    const verificarSubCarreiraNome = await prisma.subCarreira.findFirst({
      where: {
        nome_SubCarreira: parseSubCarreira.data.nome_SubCarreira,
      },
    });
    if (verificarSubCarreiraNome) {
      throw new CustomError("This Carreira already Exist", 400, [
        "Está Carreira Já existe!",
      ]);
    }
    //verificar se a carreira existe
    const verificar = await prisma.carreira.findFirst({
      where: { id: parseSubCarreira.data.Id_carreira },
    });
    if (!verificar) {
      throw new CustomError("Carreira not found!", 400, [
        "Esta Carreira não existe!",
      ]);
    }
    //criando a nova subCarreira
    const dados = await CreateSubcarreira(parseSubCarreira.data);

    return res.status(201).json({ massage: "Created Subcarreira", dados });
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};
