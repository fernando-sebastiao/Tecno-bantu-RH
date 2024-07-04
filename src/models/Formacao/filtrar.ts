import { prisma } from "../../database/db";

export interface FormacaoDTOProps {
  id?: number;
  ano_inicio?: string;
  ano_termino?: string;
  formacao?: string;
  pais?: string;
  instituicao?: string;
  Id_funcionario?: number;
}

export const FiltrarFormacao = async (query: FormacaoDTOProps) => {
  // Consultar os parâmetros de query
  const {
    Id_funcionario,
    ano_inicio,
    ano_termino,
    formacao,
    instituicao,
    pais,
  } = query;

  const dados = await prisma.formacoes.findMany({
    where: {
      Id_funcionario: Id_funcionario ? { equals: Id_funcionario } : undefined,
      ano_inicio: ano_inicio ? { equals: new Date(ano_inicio) } : undefined,
      ano_termino: ano_termino ? { equals: new Date(ano_termino) } : undefined,
      formacao: {
        contains: formacao || "",
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
