import { prisma } from "../../database/db";
import { FuncionarioDepartamentoDTO } from "../../utils/DTOs/CreateFuncionarioDepartamento";

export const UpdateFuncionarioDepartamento = async ({
  id,
  Id_departamento,
  Id_funcionario,
}: FuncionarioDepartamentoDTO) => {
  //Fazendo o update no Funcionario Departamento
  const dados = await prisma.funcionarioDepartamento.update({
    where: { id },
    data: {
      Id_departamento,
      Id_funcionario,
    },
  });
  return dados;
};
