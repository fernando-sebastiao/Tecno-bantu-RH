import { prisma } from "../../database/db";

export const destroyPerguntaFichaAvaliacao = async (id: number) => {
  //Deletar uma Pergunta de Ficha de Avaliacao
  const dados = await prisma.perguntaFichaAvaliacao.delete({
    where: { id },
  });
  return dados;
};
