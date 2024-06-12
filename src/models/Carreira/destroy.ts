import { prisma } from "../../database/db";

export const destroyCarreira = async (id: number) => {
  //Deletar uma carreira
  const dados = await prisma.carreira.delete({
    where: { id },
  });
  return dados;
};
