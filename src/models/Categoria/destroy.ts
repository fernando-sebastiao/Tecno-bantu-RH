import { prisma } from "../../database/db";

export const destroyCategoria = async (id: number) => {
  //consultar o Id
  const dados = await prisma.categoriaRH.delete({
    where: { id },
  });
  return dados;
};
