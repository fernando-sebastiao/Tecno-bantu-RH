import { prisma } from "../../database/db";

export interface subCarreiraProps {
  nome_SubCarreira?: string;
  Id_carreira?: number;
}

export const FiltrarSubcarreira = async (query: subCarreiraProps) => {
  //consultar o Id
  const { nome_SubCarreira, Id_carreira } = query;
  const dados = await prisma.subCarreira.findMany({
    where: {
      nome_SubCarreira: {
        contains: nome_SubCarreira,
        mode: "insensitive",
      },
      Id_carreira: Id_carreira ? { equals: Id_carreira } : undefined,
    },
  });
  return dados;
};
