import { prisma } from "../../database/db";

export const ListarCategoriaById = async (id: number) => {
  //consultar o Id
  const dados = await prisma.categoriaRH.findMany({
    where: { id },
    select: {
      id: true,
      nome_categoria: true,
      salario_base: true,
      Carreira: {
        select: { id: true, nome_carreira: true },
      },
      SubCarreira: {
        select: {
          id: true,
          nome_SubCarreira: true,
        },
      },
    },
  });
  return dados;
};
