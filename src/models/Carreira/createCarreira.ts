import { prisma } from "../../database/db";
import { CarreiraDTO } from "../../utils/DTOs/CreateCarreiraDTO";

export const CreateCarreira = async ({
  nome_carreira,
  regime,
}: CarreiraDTO) => {
  //criando a funcao
  const dados = await prisma.carreira.create({
    data: { nome_carreira, regime },
  });
  return dados;
};
