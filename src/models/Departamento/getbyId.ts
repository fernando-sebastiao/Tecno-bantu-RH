import { prisma } from "../../database/db";

export const getbyIdDepartamento = async (id: number) => {
  const dados = await prisma.departamento.findMany({
    where: {
      id,
    },
  });
  return dados;
};
