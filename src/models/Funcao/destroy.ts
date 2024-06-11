import { prisma } from "../../database/db";

export const destroyFuncao = async (id: number) => {
  //consultar o Id
  const dados = await prisma.funcao.delete({
    where: { id },
  });
  return dados;
};
