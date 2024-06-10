import { Request, Response } from "express";
import { prisma } from "../database/db";
import { CustomError } from "../errors/CustomError";
import { funcaoSchema } from "../utils/validateFuncao";

//Usuário criar funcao
export const createFuncao = async (req: Request, res: Response) => {
  try {
    //Validar os dados com Zod
    const parseNacionalidade = funcaoSchema.safeParse(req.body);
    if (!parseNacionalidade.success) {
      throw new CustomError(
        "Validation Error",
        400,
        parseNacionalidade.error.errors.map((error) => error.message)
      );
    }
    //criando uma nova nacionalidade
    const dados = await prisma.funcao.create({
      data: parseNacionalidade.data,
    });

    return res.status(201).json({ massage: "Created Function", dados });
  } catch (err) {
    return res.json(err);
  }
};

//Usuário lista funcao

export const getAllFuncao = async (req: Request, res: Response) => {
  const data = await prisma.funcao.findMany();

  return res.status(200).json(data);
};

//Usuário Consultar funcao
export const getbyIdFuncao = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    //verificar se existe
    const ifFuncaoexists = await prisma.funcao.findUnique({
      where: {
        id,
      },
    });
    if (!ifFuncaoexists) {
      throw new CustomError("Function not found", 401);
    }
    return res.status(200).json(ifFuncaoexists);
  } catch (err) {
    return res.json(err);
  }
};
