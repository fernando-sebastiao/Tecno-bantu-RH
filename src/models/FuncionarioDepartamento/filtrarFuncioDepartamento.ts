import { prisma } from "../../database/db";
import { FuncionarioDepartamentoDTO } from "../../utils/DTOs/CreateFuncionarioDepartamento";

//Filtrando Funcionário de departamento
export const FiltrarFuncionarioDepartamento = async (
  query: FuncionarioDepartamentoDTO
) => {
  //consultar o Id
  const { Id_departamento, Id_funcionario } = query;
  const dados = await prisma.funcionarioDepartamento.findMany({
    where: {
      Id_departamento: Id_departamento
        ? { equals: Id_departamento }
        : undefined,
      Id_funcionario: Id_funcionario ? { equals: Id_funcionario } : undefined,
    },
  });
  return dados;
};
