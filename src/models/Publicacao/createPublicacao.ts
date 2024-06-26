import { prisma } from "../../database/db";
import { PublicacaoDTO } from "../../utils/DTOs/CreatePublicacao";

export const CreatePublicacao = async ({
  titulo,
  ano,
  tipo,
  entidade,
}: PublicacaoDTO) => {
  //criando a publicacao
  const dados = await prisma.publicacoes.create({
    data: { titulo, ano, entidade, tipo },
  });
  return dados;
};
