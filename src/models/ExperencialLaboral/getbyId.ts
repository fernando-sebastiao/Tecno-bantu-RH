import { prisma } from "../../database/db";

export const getbyIdExperencialLaboral = async (id: number) => {
  const dados = await prisma.experiencialLaboral.findMany({
    where: {
      id,
    },
  });
  return dados;
};
