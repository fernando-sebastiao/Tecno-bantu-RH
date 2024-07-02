import { prisma } from "../../database/db";

export interface PerguntaFichaAvaliacaoProps {
  competenciaId?: number;
  fichaAvaliacaoId?: number;
  descricao?: string;
  nivel_esperado?: number;
}
//Filtrando Pergunta de Ficha de Avaliação
export const FiltrarPerFichaAvaliacao = async (
  query: PerguntaFichaAvaliacaoProps
) => {
  //consultar o Id
  const { competenciaId, descricao, fichaAvaliacaoId, nivel_esperado } = query;
  const dados = await prisma.perguntaFichaAvaliacao.findMany({
    where: {
      competenciaId: competenciaId ? { equals: competenciaId } : undefined,
      descricao: {
        contains: descricao || "",
        mode: "insensitive",
      },
      nivel_esperado: nivel_esperado ? { equals: nivel_esperado } : undefined,
      fichaAvaliacaoId: fichaAvaliacaoId
        ? { equals: fichaAvaliacaoId }
        : undefined,
    },
  });
  return dados;
};
