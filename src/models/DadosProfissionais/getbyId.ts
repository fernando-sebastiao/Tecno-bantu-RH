import { prisma } from "../../database/db";

export const getbyIdDadosProfissionais = async (id: number) => {
  const dados = await prisma.dadosProfissionais.findMany({
    where: {
      id,
    },
  });
  return dados;
};
