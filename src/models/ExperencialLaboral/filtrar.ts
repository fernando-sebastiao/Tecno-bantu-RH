import { prisma } from "../../database/db";

export interface ExperencilLaboralProps {
  funcao?: string;
  ano_inicio?: string;
  ano_termino?: string;
  Id_funcionario?: number;
  instituicao?: string;
  pais?: string;
}

export const FiltrarExperencialLaboral = async (
  query: ExperencilLaboralProps
) => {
  const { Id_funcionario, ano_inicio, ano_termino, funcao, instituicao, pais } =
    query;
  const dados = await prisma.experiencialLaboral.findMany({
    where: {
      Id_funcionario: Id_funcionario ? { equals: Id_funcionario } : undefined,
      ano_inicio: ano_inicio ? { equals: new Date(ano_inicio) } : undefined,
      ano_termino: ano_termino ? { equals: new Date(ano_termino) } : undefined,
      funcao: {
        contains: funcao || "",
        mode: "insensitive",
      },
      instituicao: {
        contains: instituicao || "",
        mode: "insensitive",
      },
      pais: {
        contains: pais || "",
        mode: "insensitive",
      },
    },
  });
  return dados;
};
