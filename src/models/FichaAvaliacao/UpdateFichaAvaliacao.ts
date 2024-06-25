import { prisma } from "../../database/db";
import { FichaAvaliacaoDTO } from "../../utils/DTOs/CreateFichaAvaliacaoDTO";

export const UpdateFichaAvaliacao = async ({
  id,
  nome_ficha,
  objetivo,
}: FichaAvaliacaoDTO) => {
  //Fazendo o update na função
  const dados = await prisma.fichaAvaliacao.update({
    where: { id },
    data: {
      nome_ficha,
      objetivo,
    },
  });
  return dados;
};
