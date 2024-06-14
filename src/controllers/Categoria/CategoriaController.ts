import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { CreateCategoria } from "../../models/Categoria/createCategoria";
import { categoriaSchema } from "../../utils/validateCategoria";

export const createCategoriaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //verificar a validação
    const parseCarreira = categoriaSchema.safeParse(req.body);
    if (!parseCarreira.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseCarreira.error.errors.map((error) => error.message)
      );
    }
    //verificar se a carreira existe
    const ifcarreiraExiste = await prisma.carreira.findUnique({
      where: { id: parseCarreira.data.Id_carreira },
    });
    if (!ifcarreiraExiste) {
      throw new CustomError("Esta carreira não existe!", 400, [
        "Esta carreira não existe, tente novamente!",
      ]);
    }
    //verificar se a subcarreira existe
    const ifsubCarreiraExiste = await prisma.subCarreira.findUnique({
      where: {
        id: parseCarreira.data.Id_subCarreira,
      },
    });
    if (!ifsubCarreiraExiste) {
      throw new CustomError("Esta Subcarreira não existe!", 400, [
        "Esta Subcarreira não existe, tente novamente!",
      ]);
    }
    //verificar se a categoria já existe
    const verificar = await prisma.categoriaRH.findFirst({
      where: { nome_categoria: parseCarreira.data.nome_categoria },
    });
    if (verificar) {
      throw new CustomError("This Carreira already exists", 400, [
        "Esta Carreira já existe",
      ]);
    }
    const dados = await CreateCategoria({
      nome_categoria: parseCarreira.data.nome_categoria,
      salario_base: parseCarreira.data.salario_base,
      Id_carreira: parseCarreira.data.Id_carreira,
      Id_subCarreira: parseCarreira.data.Id_subCarreira,
    });
    return res.status(201).json({ massage: "Created Categoria", dados });
  } catch (err) {
    next(err);
  }
};
