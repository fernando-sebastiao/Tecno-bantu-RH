import { prisma } from "../../database/db";

export const destroyFormacao = async (id: number) => {
  //consultar o Id
  const dados = await prisma.formacoes.delete({
    where: { id },
  });
  return dados;
};
