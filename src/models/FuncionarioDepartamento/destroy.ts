import { prisma } from "../../database/db";

export const destroyFuncionarioDepartamento = async (id: number) => {
  //Deletar o Funcionario de um departamento
  const dados = await prisma.funcionarioDepartamento.delete({
    where: { id },
  });
  return dados;
};
