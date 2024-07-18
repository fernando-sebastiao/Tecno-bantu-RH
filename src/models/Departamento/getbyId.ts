import { prisma } from "../../database/db";

export const getbyIdDepartamento = async (id: number) => {
  const dados = await prisma.departamento.findMany({
    select: {
      id: true,
      nome_departamento: true,
      funcionario_chefe: {
        select: {
          id: true,
          nome_completo: true,
          avatar: true,
        },
      },
      funcionario_supervisor: {
        select: {
          id: true,
          nome_completo: true,
          avatar: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    where: {
      id,
    },
  });
  return dados;
};
