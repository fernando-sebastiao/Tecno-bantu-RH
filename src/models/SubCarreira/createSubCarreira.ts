import { prisma } from "../../database/db";
import { subCarreiraDTO } from "../../utils/DTOs/CreateSubcarreiraDTO";

export const CreateSubcarreira = async ({
  nome_SubCarreira,
  Id_carreira,
}: subCarreiraDTO) => {
  //criando a subCarreira
  const dados = await prisma.subCarreira.create({
    data: { nome_SubCarreira, Id_carreira },
  });
  return dados;
};
