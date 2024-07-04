import { prisma } from "../../database/db";
import { FormacaoDTO } from "../../utils/DTOs/CreateFormacoesDTO";

export const CreateFormacao = async ({
  ano_inicio,
  ano_termino,
  pais,
  Id_funcionario,
  instituicao,
  formacao,
}: FormacaoDTO) => {
  //criando a Formacao
  const dados = await prisma.formacoes.create({
    data: {
      ano_inicio: new Date(ano_inicio),
      ano_termino: new Date(ano_termino),
      pais,
      Id_funcionario,
      formacao,
      instituicao,
    },
  });
  return dados;
};
