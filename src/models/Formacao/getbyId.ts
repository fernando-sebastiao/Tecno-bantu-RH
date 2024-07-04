import { prisma } from "../../database/db";

export const ListarFormacaoById = async (id: number) => {
  //consultar o Id
  const dados = await prisma.formacoes.findMany({
    where: { id },
  });
  return dados;
};
