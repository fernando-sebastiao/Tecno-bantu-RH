import { prisma } from "../../database/db";

export const getbyIdSubcarreira = async (id: number) => {
  const dados = await prisma.subCarreira.findMany({
    where: {
      id,
    },
  });
  return dados;
};
