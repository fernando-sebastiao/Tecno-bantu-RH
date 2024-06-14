import { prisma } from "../../database/db";
import { subCarreiraDTO } from "../../utils/DTOs/CreateSubcarreiraDTO";

//Actualizar SubCarreira
export const updateSubCarreira = async ({
  id,
  nome_SubCarreira,
  Id_carreira,
}: subCarreiraDTO) => {
  //Fazendo o update na SubCarreira
  const dados = await prisma.subCarreira.update({
    where: { id },
    data: {
      nome_SubCarreira,
      Id_carreira,
    },
  });
  return dados;
};
