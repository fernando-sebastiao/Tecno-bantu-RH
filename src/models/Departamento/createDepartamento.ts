import { prisma } from "../../database/db";
import { DepartamentoDTO } from "../../utils/DTOs/CreateDepartamentoDTO";

export const CreateDepartamento = async ({
  nome_departamento,
  Id_funcionario_chefe,
  Id_funcionario_supervisor,
}: DepartamentoDTO) => {
  //criando o departamento
  const dados = await prisma.departamento.create({
    data: {
      nome_departamento,
      Id_funcionario_chefe,
      Id_funcionario_supervisor,
    },
  });
  return dados;
};
