import { prisma } from "../../database/db";
import { DadosProfissionaisDTO } from "../../utils/DTOs/CreateDadosProfissionaisDTO";

export const updateDadosProfissionais = async ({
  Id_funcionario,
  contrato,
  data_admissao,
  data_despacho,
  numero_despacho,
  id,
}: DadosProfissionaisDTO) => {
  //Fazendo o update Dados Profissionais
  const dados = await prisma.dadosProfissionais.update({
    where: { id },
    data: {
      contrato,
      data_admissao: new Date(data_admissao),
      data_despacho: new Date(data_despacho),
      Id_funcionario,
      numero_despacho,
    },
  });
  return dados;
};
