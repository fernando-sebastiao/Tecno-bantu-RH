import { prisma } from "../../database/db";

export const ListarBancoById = async (id: number) => {
  //consultar o Id
  const dados = await prisma.banco.findMany({
    where: { id },
  });
  return dados;
};
