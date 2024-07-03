import { prisma } from "../../database/db";

export const getbyIdFuncionarioDepartamento = async (id: number) => {
  const dados = await prisma.funcionarioDepartamento.findMany({
    where: {
      id,
    },
  });
  return dados;
};
