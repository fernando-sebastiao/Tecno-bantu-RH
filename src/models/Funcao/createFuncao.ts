import { prisma } from "../../database/db";
import { FuncaoDTO } from "../../utils/DTOs/CreateFuncaoDTO";

export const CreateFuncao = async ({ nome_funcao }: FuncaoDTO) => {
  //criando a funcao
  const dados = await prisma.funcao.create({
    data: { nome_funcao },
  });
  return dados;
};
