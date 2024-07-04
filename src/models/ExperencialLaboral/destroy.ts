import { prisma } from "../../database/db";

export const destroyExperencialLaboral = async (id: number) => {
  //consultar o Id
  const dados = await prisma.experiencialLaboral.delete({
    where: { id },
  });
  return dados;
};
