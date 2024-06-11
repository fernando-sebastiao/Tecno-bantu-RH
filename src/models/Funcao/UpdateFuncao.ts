import { Funcao } from "@prisma/client";
import { prisma } from "../../database/db";
import { FuncaoDTO } from "../../utils/DTOs/CreateFuncaoDTO";

export const UpdateFuncao = async ({
  id,
  nome_funcao,
}: FuncaoDTO): Promise<Funcao> => {
  //criando a funcao
  const dados = await prisma.funcao.update({
    where: { id },
    data: {
      nome_funcao,
    },
  });
  return dados;
};
