import { prisma } from "../../database/db";

export const getbyIdFuncionario = async (id: number) => {
  const dados = await prisma.funcionario.findMany({
    where: {
      id,
    },
  });
  return dados;
};
