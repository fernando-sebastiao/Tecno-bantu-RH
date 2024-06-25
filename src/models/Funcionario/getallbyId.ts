import { prisma } from "../../database/db";

export const ListarFuncionarioById = async (id: number) => {
  //consultar o Id
  const dados = await prisma.funcao.findMany({
    where: { id },
  });
  return dados;
};
