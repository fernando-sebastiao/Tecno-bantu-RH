import { prisma } from "../../database/db";

export interface DepartamentoProps {
  id?: number;
  nome_departamento?: string;
  Id_funcionario_chefe?: number;
  Id_funcionario_supervisor?: number;
}

export const FiltrarDepartamento = async (query: DepartamentoProps) => {
  const { nome_departamento, Id_funcionario_chefe, Id_funcionario_supervisor } =
    query;

  const dados = await prisma.departamento.findMany({
    where: {
      nome_departamento: {
        contains: nome_departamento || "", // Garante que se nome_categoria for undefined, a condição seja ignorada
        mode: "insensitive",
      },
      Id_funcionario_chefe: Id_funcionario_chefe
        ? { equals: Id_funcionario_chefe }
        : undefined, // Filtra por igualdade se Id_carreira estiver definido
      Id_funcionario_supervisor: Id_funcionario_supervisor
        ? { equals: Id_funcionario_supervisor }
        : undefined, // Filtra por igualdade se Id_funcionario_supervisor estiver definido
    },
  });

  return dados;
};
