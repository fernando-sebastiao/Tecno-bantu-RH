import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import {
  FiltrarSubcarreira,
  subCarreiraProps,
} from "../../models/SubCarreira/FiltrarSubcarreira";
import { CreateSubcarreira } from "../../models/SubCarreira/createSubCarreira";
import { destroySubCarreira } from "../../models/SubCarreira/destroy";
import { updateSubCarreira } from "../../models/SubCarreira/updateSubCategoria";
import { SubCarreiraSchema } from "../../utils/Validations/validateSubCarreira";

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
export const FiltrarSubCarreiraController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as subCarreiraProps;

    const SubCarreira = await FiltrarSubcarreira(query);
    if (SubCarreira.length === 0) {
      throw new CustomError("Funcionário não encontrado!", 400, [
        "Funcionário não foi encontrado!",
      ]);
    }
    return res.status(200).json(SubCarreira);
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros;
  }
};
//Deletar SubCarreira
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

//actualizar SubCarreira
export const updateSubCarreiraController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { nome_SubCarreira, Id_carreira } = req.body;

  try {
    // Verificar se o subCarreira existe
    const verificar = await prisma.subCarreira.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!verificar) {
      throw new CustomError("SubCarreira Not Found", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Validar os dados
    const verificarDado = SubCarreiraSchema.safeParse(req.body);

    if (!verificarDado.success) {
      // Filtrar especificamente o erro de nome_SubCarreira.nonempty
      const nomeBancoError = verificarDado.error.errors.find(
        (error) =>
          error.path.includes("nome_SubCarreira") &&
          error.message === "O nome não pode ser enviado vázio!"
      );

      if (nomeBancoError) {
        throw new CustomError("Erro de Validação", 400, [
          nomeBancoError.message,
        ]);
      } else {
        // Se não for o erro de nome_SubCarreira.nonempty, lançar todos os erros de validação
        throw new CustomError(
          "Erro de Validação",
          400,
          verificarDado.error.errors.map((error) => error.message)
        );
      }
    }

    // Atualizar os dados
    const dados = await updateSubCarreira({
      id: Number(id),
      nome_SubCarreira: verificarDado.data.nome_SubCarreira,
      Id_carreira: verificarDado.data.Id_carreira,
    });

    return res.json({
      Error: false,
      message: "SubCarreira atualizada com sucesso",
      dados,
    });
  } catch (err) {
    next(err);
  }
};
