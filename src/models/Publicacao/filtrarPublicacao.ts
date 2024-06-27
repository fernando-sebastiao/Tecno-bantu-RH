import { prisma } from "../../database/db";

export interface PublicacaoProps {
  titulo?: string;
  ano?: string; // ano é uma string que será convertida para Date
  tipo?: "livro" | "cientifico" | "outro";
  entidade?: string;
}

export const FiltrarPublicacao = async (query: PublicacaoProps) => {
  // Consultar os parâmetros de query
  const { tipo, titulo, ano, entidade } = query;

  const dados = await prisma.publicacoes.findMany({
    where: {
      titulo: {
        contains: titulo || "",
        mode: "insensitive",
      },
      entidade: {
        contains: entidade || "",
        mode: "insensitive",
      },
      ano: ano
        ? {
            equals: new Date(ano),
          }
        : undefined,
      tipo: tipo ? { equals: tipo } : undefined,
    },
  });

  return dados;
};
