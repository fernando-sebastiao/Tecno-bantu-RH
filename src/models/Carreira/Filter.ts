import { prisma } from "../../database/db";

export interface CarreiraProps {
  id?: number;
  nome_carreira?: string;
  regime?: "geral" | "especial";
}

export const FiltrarCarreira = async (query: CarreiraProps) => {
  const { nome_carreira, regime } = query;

  const dados = await prisma.carreira.findMany({
    where: {
      nome_carreira: {
        contains: nome_carreira || "", // Garante que se nome_carreira for undefined, a condição seja ignorada
        mode: "insensitive",
      },
      regime: regime ? { equals: regime } : undefined, // Condição de igualdade apenas se regime estiver definido
    },
  });

  return dados;
};
