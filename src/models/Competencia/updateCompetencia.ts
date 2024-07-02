import { prisma } from "../../database/db";
import { CompetenciaDTO } from "../../utils/DTOs/CreateCompetencia";

//Actualizar Carreira
export const updateCompetencia = async ({
  id,
  nome_competencia,
  criterio,
}: CompetenciaDTO) => {
  //Fazendo o update na competencia
  const dados = await prisma.competencia.update({
    where: { id },
    data: {
      nome_competencia,
      criterio,
    },
  });
  return dados;
};
