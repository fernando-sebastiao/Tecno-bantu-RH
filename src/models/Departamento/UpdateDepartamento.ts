import { prisma } from "../../database/db";
import { DepartamentoDTO } from "../../utils/DTOs/CreateDepartamentoDTO";

export const UpdateDepartamento = async ({
  id,
  nome_departamento,
  Id_funcionario_chefe,
  Id_funcionario_supervisor,
}: DepartamentoDTO) => {
  //Fazendo o update no departamento
  const dados = await prisma.departamento.update({
    where: { id },
    data: {
      nome_departamento,
      Id_funcionario_chefe,
      Id_funcionario_supervisor,
    },
  });
  return dados;
};
