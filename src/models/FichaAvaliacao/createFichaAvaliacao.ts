import { prisma } from "../../database/db";
import { FichaAvaliacaoDTO } from "../../utils/DTOs/CreateFichaAvaliacaoDTO";

export const CreateFichaAvaliacao = async ({
  nome_ficha,
  objetivo,
}: FichaAvaliacaoDTO) => {
  //criando a FichaAvaliacao
  const dados = await prisma.fichaAvaliacao.create({
    data: { nome_ficha, objetivo },
  });
  return dados;
};
