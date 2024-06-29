import { prisma } from "../../database/db";

export const getbyIdPublicacao = async (id: number) => {
  const dados = await prisma.publicacoes.findMany({
    where: {
      id,
    },
  });
  return dados;
};
