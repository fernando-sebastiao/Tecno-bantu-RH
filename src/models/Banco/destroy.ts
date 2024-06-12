import { prisma } from "../../database/db";

export const destroyBanco = async (id: number) => {
  //consultar o Id
  const dados = await prisma.banco.delete({
    where: { id },
  });
  return dados;
};
