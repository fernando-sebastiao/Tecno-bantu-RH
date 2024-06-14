import { prisma } from "../../database/db";

export const destroySubCarreira = async (id: number) => {
  //Deletar uma Subcarreira
  const dados = await prisma.subCarreira.delete({
    where: { id },
  });
  return dados;
};
