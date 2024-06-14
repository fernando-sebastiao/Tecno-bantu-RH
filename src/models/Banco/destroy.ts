import { prisma } from "../../database/db";

export const destroyBanco = async (id: number) => {
  //Deletar o Banco
  const dados = await prisma.banco.delete({
    where: { id },
  });
  return dados;
};
