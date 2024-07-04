import { Request, Response } from "express";
import { prisma } from "../../database/db";

//listar Experencial Laboral
export const getAllExperencialLaboral = async (req: Request, res: Response) => {
  const data = await prisma.experiencialLaboral.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return res.status(200).json(data);
};
