import { prisma } from "../../database/db";

export const getbyIdCarreira = async (id: number) => {
  const dados = await prisma.carreira.findMany({
    where: {
      id,
    },
  });
  return dados;
};
