import { prisma } from "../../database/db";

export interface propsal {
  nome_banco?: string;
  codigo?: string;
  sigla?: string;
}

export const FiltrarBanco = async (query: propsal) => {
  const { nome_banco, codigo, sigla } = query;

  // Consultar o banco de dados
  const dados = await prisma.banco.findMany({
    where: {
      nome_banco: {
        contains: nome_banco,
        mode: "insensitive",
      },
      codigo: {
        contains: codigo,
        mode: "insensitive",
      },
      sigla: {
        contains: sigla,
        mode: "insensitive",
      },
    },
  });
  return dados;
};
