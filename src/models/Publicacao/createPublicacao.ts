import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
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
