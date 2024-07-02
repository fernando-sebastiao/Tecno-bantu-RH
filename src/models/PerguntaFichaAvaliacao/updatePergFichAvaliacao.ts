import { prisma } from "../../database/db";
import { PerguntaFichaAvaliacaoDTO } from "../../utils/DTOs/CreatePerguntaFichaAvaliacaoDTO";

export const UpdatePergFichaAvaliacao = async ({
  id,
  descricao,
  nivel_esperado,
  competenciaId,
  fichaAvaliacaoId,
}: PerguntaFichaAvaliacaoDTO) => {
  //Fazendo o update na pergunta de ficha de avaliacao
  const dados = await prisma.perguntaFichaAvaliacao.update({
    where: { id },
    data: {
      competenciaId,
      descricao,
      fichaAvaliacaoId,
      nivel_esperado,
    },
  });
  return dados;
};
