import { prisma } from "../../database/db";
import { CarreiraDTO } from "../../utils/DTOs/CreateCarreiraDTO";

//Actualizar Carreira
export const updateCarreira = async ({
  id,
  nome_carreira,
  regime,
}: CarreiraDTO) => {
  //Fazendo o update na Carreira
  const dados = await prisma.carreira.update({
    where: { id },
    data: {
      nome_carreira,
      regime,
    },
  });
  return dados;
};
