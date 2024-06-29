import { prisma } from "../../database/db";

export const getbyIdFuncao = async (id: number) => {
  const dados = await prisma.funcao.findMany({
    where: {
      id,
    },
  });
  return dados;
};
