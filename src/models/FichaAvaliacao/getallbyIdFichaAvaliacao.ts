import { prisma } from "../../database/db";

export const ListarFichaAvaliacaoById = async (id: number) => {
  //consultar o Id
  const dados = await prisma.fichaAvaliacao.findMany({
    where: { id },
  });
  return dados;
};
