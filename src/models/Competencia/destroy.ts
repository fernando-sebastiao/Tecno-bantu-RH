import { prisma } from "../../database/db";

export const destroyCompetencia = async (id: number) => {
  //Deletar uma Competencia
  const dados = await prisma.competencia.delete({
    where: { id },
  });
  return dados;
};
