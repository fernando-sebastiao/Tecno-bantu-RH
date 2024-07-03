import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { CarreiraProps, FiltrarCarreira } from "../../models/Carreira/Filter";
import { updateCarreira } from "../../models/Carreira/UpdateCarreira";
import { CreateCarreira } from "../../models/Carreira/createCarreira";
import { destroyCarreira } from "../../models/Carreira/destroy";
import { getbyIdCarreira } from "../../models/Carreira/getbyId";
import { CarreiraSchema } from "../../utils/Validations/validateCarreira";

//criar um Carreira
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
        parseCarreira.error.errors.map(
          (error) => `${error.path[0]}: ${error.message}`
        )
      );
    }
    //verificar se a carreira já existe
    const verificar = await prisma.carreira.findFirst({
      where: { nome_carreira: parseCarreira.data.nome_carreira },
    });
    if (verificar) {
      throw new CustomError("This Carreira already exists", 400, [
        "Esta Carreira já existe",
      ]);
    }
    const dados = await CreateCarreira(parseCarreira.data);
    return res.status(201).json({ massage: "Created Carreira", dados });
  } catch (err) {
    next(err);
  }
};

//Usuário Consultar Carreira
export const FiltrarCarreiraController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as CarreiraProps;
    //verificar se existe

    const carreira = await FiltrarCarreira(query);
    if (carreira.length === 0) {
      throw new CustomError("Carreira não encontrada", 400, [
        "Carreira não foi encontrada!",
      ]);
    }
    return res.status(200).json(carreira);
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros;
  }
};

//Deletar Carreira
export const deleteCarreiraController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const carreira = await prisma.carreira.findFirst({
      where: { id: Number(id) },
    });

    if (!carreira) {
      throw new CustomError("Carreira não encontrada", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Fazer o delete da Carreira
    const dados = await destroyCarreira(Number(id));

    return res.json({
      Error: false,
      message: "Função Deletada com sucesso",
      dados,
    });
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};

//Fazendo o Update
export const updateCarreiraController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { nome_carreira, regime } = req.body;

  try {
    // Verificar se o banco existe
    const verificar = await prisma.carreira.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!verificar) {
      throw new CustomError("Carreira Not Found", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Validar os dados
    const verificarDado = CarreiraSchema.safeParse(req.body);

    if (!verificarDado.success) {
      // Filtrar especificamente o erro de nome_carreira.nonempty
      const nomeCarreiraError = verificarDado.error.errors.find(
        (error) =>
          error.path.includes("nome_carreira") &&
          error.message === "O nome não pode ser enviado vázio!"
      );

      if (nomeCarreiraError) {
        throw new CustomError("Erro de Validação", 400, [
          nomeCarreiraError.message,
        ]);
      } else {
        // Se não for o erro de nome_carreira.nonempty, lançar todos os erros de validação
        throw new CustomError(
          "Erro de Validação",
          400,
          verificarDado.error.errors.map(
            (error) => `${error.path[0]}: ${error.message}`
          )
        );
      }
    }

    // Atualizar os dados
    const dados = await updateCarreira({
      id: Number(id),
      nome_carreira: verificarDado.data.nome_carreira,
      regime: verificarDado.data.regime,
    });

    return res.json({
      Error: false,
      message: "Carreira atualizada com sucesso!✔",
      dados,
    });
  } catch (err) {
    next(err);
  }
};

export const getbyIdCarreiraController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const verificar = await prisma.carreira.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!verificar) {
      throw new CustomError("Carreira não encontrada!", 400, [
        "A carreira não foi encontrada!",
      ]);
    }
    //trazendo os dados
    const dados = await getbyIdCarreira(Number(id));
    return res.status(200).json(dados);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
