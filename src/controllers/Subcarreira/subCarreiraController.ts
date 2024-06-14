import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { CreateSubcarreira } from "../../models/SubCarreira/createSubCarreira";
import { destroySubCarreira } from "../../models/SubCarreira/destroy";
import { ListarSubCarreiraById } from "../../models/SubCarreira/getallbyId";
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

//Usuário Consultar SubCarreira
export const getbyIdSubCarreiraController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const funcao = await prisma.subCarreira.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!funcao) {
      throw new CustomError("SubCarreira not found!", 400, [
        "SubCarreira não encontrada!",
      ]);
    }
    const SubCarreira = await ListarSubCarreiraById(Number(id));
    return res.status(200).json(SubCarreira);
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros;
  }
};

export const deleteSubCarreiraController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const carreira = await prisma.subCarreira.findFirst({
      where: { id: Number(id) },
    });

    if (!carreira) {
      throw new CustomError("SubCarreira not found!", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Fazer o delete da Carreira
    const dados = await destroySubCarreira(Number(id));

    return res.json({
      Error: false,
      message: "SubCarreira Deletada com sucesso",
      dados,
    });
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};
