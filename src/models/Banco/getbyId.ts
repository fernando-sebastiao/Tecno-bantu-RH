import { prisma } from "../../database/db";

export const getbyIdBanco = async (id: number) => {
  const dados = await prisma.banco.findMany({
    where: {
      id,
    },
  });
  return dados;
};
