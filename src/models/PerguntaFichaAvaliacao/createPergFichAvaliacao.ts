import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { PerguntaFichaAvaliacaoDTO } from "../../utils/DTOs/CreatePerguntaFichaAvaliacaoDTO";

export const createPerguntaFichaAvaliacao = async ({
  competenciaId,
  descricao,
  nivel_esperado,
  fichaAvaliacaoId,
}: PerguntaFichaAvaliacaoDTO) => {
  try {
    const dados = await prisma.perguntaFichaAvaliacao.create({
      data: { competenciaId, descricao, nivel_esperado, fichaAvaliacaoId },
    });
    return dados;
  } catch (error) {
    throw new CustomError(`${error}`);
  }
};
