import { prisma } from "../../database/db";
import { ExperencilLaboralDTO } from "../../utils/DTOs/CreateExperencialLaboralDTO";

export const CreateExperencialLaboral = async ({
  ano_inicio,
  ano_termino,
  funcao,
  instituicao,
  pais,
  Id_funcionario,
}: ExperencilLaboralDTO) => {
  //criando o Experencial Laboral
  const dados = await prisma.experiencialLaboral.create({
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
