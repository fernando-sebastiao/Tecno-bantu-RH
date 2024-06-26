import { prisma } from "../../database/db";

export const destroyDepartamento = async (id: number) => {
  //consultar o Id
  const dados = await prisma.departamento.delete({
    where: { id },
  });
  return dados;
};
