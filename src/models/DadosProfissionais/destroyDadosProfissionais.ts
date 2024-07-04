import { prisma } from "../../database/db";

export const destroyDadosProfissionais = async (id: number) => {
  //consultar o Id
  const dados = await prisma.dadosProfissionais.delete({
    where: { id },
  });
  return dados;
};
