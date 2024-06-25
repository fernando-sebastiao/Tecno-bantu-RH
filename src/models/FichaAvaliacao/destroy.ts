import { prisma } from "../../database/db";

export const destroyFichaAvaliacao = async (id: number) => {
  //consultar o Id
  const dados = await prisma.fichaAvaliacao.delete({
    where: { id },
  });
  return dados;
};
