import { prisma } from "../../database/db";

export const getbyIdCategoria = async (id: number) => {
  const dados = await prisma.categoriaRH.findMany({
    where: {
      id,
    },
  });
  return dados;
};
