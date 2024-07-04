import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { DadosProfissionaisDTO } from "../../utils/DTOs/CreateDadosProfissionaisDTO";
import { PublicacaoDTO } from "../../utils/DTOs/CreatePublicacao";

export const CreatePublicacao = async ({
  titulo,
  ano,
  tipo,
  entidade,
}: PublicacaoDTO) => {
  try {
    const dados = await prisma.publicacoes.create({
      data: { titulo, ano: new Date(ano), entidade, tipo },
    });
    return dados;
  } catch (error) {
    throw new CustomError(`${error}`);
  }
};

export const CreateDadosProfissionais = async ({
  numero_despacho,
  Id_funcionario,
  contrato,
  data_admissao,
  data_despacho,
}: DadosProfissionaisDTO) => {
  try {
    const dados = await prisma.dadosProfissionais.create({
      data: {
        contrato,
        data_admissao: new Date(data_admissao),
        data_despacho: new Date(data_despacho),
        Id_funcionario,
        numero_despacho,
      },
    });
    return dados;
  } catch (error) {
    throw new CustomError(`${error}`);
  }
};
