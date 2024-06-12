import { prisma } from "../../database/db";
import { FuncaoDTO } from "../../utils/DTOs/CreateFuncaoDTO";

export const UpdateFuncao = async ({ id, nome_funcao }: FuncaoDTO) => {
  //Fazendo o update na função
  const dados = await prisma.funcao.update({
    where: { id },
    data: {
      nome_funcao,
    },
  });
  return dados;
};
