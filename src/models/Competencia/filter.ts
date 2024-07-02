import { prisma } from "../../database/db";

export interface CompetenciaProps {
  nome_competencia?: string;
  criterio?: "Comportamental" | "Tecnico";
}

export const FiltrarCompetencia = async (query: CompetenciaProps) => {
  const { nome_competencia, criterio } = query;

  const dados = await prisma.competencia.findMany({
    where: {
      nome_competencia: {
        contains: nome_competencia || "", // Garante que se nome_competencia for undefined, a condição seja ignorada
        mode: "insensitive",
      },
      criterio: criterio ? { equals: criterio } : undefined, //
    },
  });

  return dados;
};
