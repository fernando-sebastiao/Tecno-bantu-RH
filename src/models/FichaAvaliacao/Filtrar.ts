import { prisma } from "../../database/db";

export interface FichaAvaliacaoProps {
  id?: number;
  nome_ficha?: string;
  objetivo?: string;
}

export const FiltrarFichaAvaliacao = async (query: FichaAvaliacaoProps) => {
  const { nome_ficha, objetivo } = query;

  const dados = await prisma.fichaAvaliacao.findMany({
    where: {
      nome_ficha: {
        contains: nome_ficha || "", // Garante que se nome_categoria for undefined, a condição seja ignorada
        mode: "insensitive",
      },
      objetivo: {
        contains: objetivo,
        mode: "insensitive",
      },
    },
  });

  return dados;
};
