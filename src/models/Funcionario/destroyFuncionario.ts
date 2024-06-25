import { prisma } from "../../database/db";

export const destroyFuncionario = async (id: number) => {
  //Deletar um funcionario
  const dados = await prisma.funcionario.delete({
    where: { id },
  });
  return dados;
};
