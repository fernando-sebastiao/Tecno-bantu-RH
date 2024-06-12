import { prisma } from "../../database/db";

export const ListarCarreiraById = async (id: number) => {
  //consultar o Id
  const dados = await prisma.carreira.findMany({
    where: { id },
  });
  return dados;
};
