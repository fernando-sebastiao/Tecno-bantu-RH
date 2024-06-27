import { prisma } from "../../database/db";

export interface FuncaoProps {
  nome_funcao?: string;
}

export const FiltrarFuncao = async (query: FuncaoProps) => {
  //consultar o Id
  const { nome_funcao } = query;
  const dados = await prisma.funcao.findMany({
    where: {
      nome_funcao: {
        contains: nome_funcao,
        mode: "insensitive",
      },
    },
  });
  return dados;
};
