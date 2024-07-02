//Usuário listar Pergunta de Ficha de Avaliacao

import { Request, Response } from "express";
import { prisma } from "../../database/db";

//listar Pergunta de Ficha de Avaliacao
export const getAllPerguntaFichaAvaliacao = async (
  req: Request,
  res: Response
) => {
  const data = await prisma.perguntaFichaAvaliacao.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return res.status(200).json(data);
};
