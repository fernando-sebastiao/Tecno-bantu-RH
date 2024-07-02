import { prisma } from "../../database/db";

export const getbyIdPerguntaFichaAvaliacao = async (id: number) => {
  const dados = await prisma.perguntaFichaAvaliacao.findMany({
    where: {
      id,
    },
  });
  return dados;
};
