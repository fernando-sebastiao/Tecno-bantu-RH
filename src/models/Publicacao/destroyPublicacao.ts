import { prisma } from "../../database/db";

export const destroyPublicacao = async (id: number) => {
  //Deletar uma Publicação
  const dados = await prisma.publicacoes.delete({
    where: { id },
  });
  return dados;
};
