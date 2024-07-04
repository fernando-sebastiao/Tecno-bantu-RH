import { prisma } from "../../database/db";

export interface DadosProfissionaisProps {
  id?: number;
  data_admissao?: string;
  numero_despacho?: string;
  contrato?: "CTD" | "CAP";
  Id_funcionario?: number;
  data_despacho?: string;
}

export const FiltrarDadosProfissionais = async (
  query: DadosProfissionaisProps
) => {
  // Consultar os parâmetros de query
  const {
    Id_funcionario,
    contrato,
    data_admissao,
    data_despacho,
    numero_despacho,
  } = query;

  const dados = await prisma.dadosProfissionais.findMany({
    where: {
      Id_funcionario: Id_funcionario ? { equals: Id_funcionario } : undefined,
      data_admissao: data_admissao
        ? { equals: new Date(data_admissao) }
        : undefined,
      data_despacho: data_despacho
        ? { equals: new Date(data_despacho) }
        : undefined,
      numero_despacho: numero_despacho
        ? { equals: numero_despacho }
        : undefined,
      contrato: contrato ? { equals: contrato } : undefined,
    },
  });

  return dados;
};
