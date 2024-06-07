import { Request, Response } from "express";
import { prisma } from "../database/db";
import { CustomError } from "../errors/CustomError";
import { nacionalidadeSchema } from "../utils/validateNacionalidade";

export const createNacionalidade = async (req: Request, res: Response) => {
  try {
    //Validar os dados com Zod
    const parseNacionalidade = nacionalidadeSchema.safeParse(req.body);
    if (!parseNacionalidade.success) {
      throw new CustomError(
        "Validation Error",
        400,
        parseNacionalidade.error.errors.map((error) => error.message)
      );
    }
    //criando uma nova nacionalidade
    const dados = await prisma.nacionalidade.create({
      data: parseNacionalidade.data,
    });

    return res.status(201).json({ massage: "Created nacionality", dados });
  } catch (err) {
    return res.json(err);
  }
};

export const getAllnacionalidades = async (req: Request, res: Response) => {
  const data = await prisma.nacionalidade.findMany();

  return res.status(200).json(data);
};
