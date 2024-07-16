import { prisma } from "../../database/db";

export const getbyIdSubcarreira = async (id: number) => {
  const dados = await prisma.subCarreira.findMany({
    where: {
      id,
    },
    select: {
      id: true,
      nome_SubCarreira: true,
      Carreira: {
        select: {
          id: true,
          nome_carreira: true,
          regime: true,
        },
      },
    },
  });
  return dados;
};
