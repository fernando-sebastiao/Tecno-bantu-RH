import { prisma } from "../../database/db";
import { CompetenciaDTO } from "../../utils/DTOs/CreateCompetencia";

export const createCompetencia = async ({
  nome_competencia,
  criterio,
}: CompetenciaDTO) => {
  //criando a competencia
  const dados = await prisma.competencia.create({
    data: { nome_competencia, criterio },
  });
  return dados;
};
