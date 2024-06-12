import { prisma } from "../../database/db";
import { CarreiraDTO } from "../../utils/DTOs/CreateCarreiraDTO";

//criar carreira
export const CreateCarreira = async ({
  nome_carreira,
  regime,
}: CarreiraDTO) => {
  //criando carreira
  const dados = await prisma.carreira.create({
    data: { nome_carreira, regime },
  });
  return dados;
};
