import { prisma } from "../../database/db";

export const getbyIdCompetencia = async (id: number) => {
  const dados = await prisma.competencia.findMany({
    where: {
      id,
    },
  });
  return dados;
};
