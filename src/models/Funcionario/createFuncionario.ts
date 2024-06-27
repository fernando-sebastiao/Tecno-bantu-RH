import { prisma } from "../../database/db";
import { FuncionarioDTO } from "../../utils/DTOs/CreateFuncionarioDTO";

//criar categoria
export const CreateFuncionario = async ({
  nome_completo,
  bairro,
  id_categoria,
  email,
  genero,
  Id_banco,
  nascimento,
  iban,
  id_funcao,
  nivel_academico,
  nome_mae,
  nome_pai,
  num_identificacao,
  rua,
  telefone1,
  tipo_identificacao,
  avatar,
  instagram,
  linkedin,
  num_conta,
  telefone2,
  whatsApp,
}: FuncionarioDTO) => {
  //criando categoria
  const dados = await prisma.funcionario.create({
    data: {
      nome_completo,
      bairro,
      id_categoria,
      email,
      genero,
      Id_banco,
      nascimento: new Date(nascimento),
      iban,
      id_funcao,
      nivel_academico,
      nome_mae,
      nome_pai,
      num_identificacao,
      rua,
      telefone1,
      tipo_identificacao,
      avatar,
      instagram,
      linkedin,
      num_conta,
      telefone2,
      whatsApp,
    },
  });
  return dados;
};
