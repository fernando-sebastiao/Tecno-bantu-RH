import { prisma } from "../../database/db";

export const ListarSubCarreiraById = async (id: number) => {
  //consultar o Id
  const dados = await prisma.subCarreira.findMany({
    where: { id },
  });
  return dados;
};
