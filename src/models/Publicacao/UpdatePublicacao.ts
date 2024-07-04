import { prisma } from "../../database/db";
import { PublicacaoDTO } from "../../utils/DTOs/CreatePublicacao";

export const UpdatePublicacao = async ({
  id,
  titulo,
  entidade,
  ano,
  tipo,
}: PublicacaoDTO) => {
  //Fazendo a actualização na publicação
  const dados = await prisma.publicacoes.update({
    where: { id },
    data: {
      titulo,
      ano: new Date(ano),
      tipo,
      entidade,
    },
  });
  return dados;
};
