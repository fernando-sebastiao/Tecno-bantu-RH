import { prisma } from "../../database/db";
import { ExperencilLaboralDTO } from "../../utils/DTOs/CreateExperencialLaboralDTO";

export const UpdateExperencialLaboral = async ({
  id,
  ano_inicio,
  ano_termino,
  funcao,
  instituicao,
  pais,
  Id_funcionario,
}: ExperencilLaboralDTO) => {
  //Fazendo o update Experencial Laboral
  const dados = await prisma.experiencialLaboral.update({
    where: { id },
    data: {
      ano_inicio: new Date(ano_inicio),
      ano_termino: new Date(ano_termino),
      funcao,
      instituicao,
      Id_funcionario,
      pais,
    },
  });
  return dados;
};
