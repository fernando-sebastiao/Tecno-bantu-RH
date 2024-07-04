import { prisma } from "../../database/db";
import { FormacaoDTO } from "../../utils/DTOs/CreateFormacoesDTO";

export const UpdateFormacao = async ({
  id,
  ano_inicio,
  ano_termino,
  formacao,
  instituicao,
  pais,
  Id_funcionario,
}: FormacaoDTO) => {
  //Fazendo o update na função
  const dados = await prisma.formacoes.update({
    where: { id },
    data: {
      ano_inicio: new Date(ano_inicio),
      ano_termino: new Date(ano_termino),
      formacao,
      instituicao,
      pais,
      Id_funcionario,
    },
  });
  return dados;
};
