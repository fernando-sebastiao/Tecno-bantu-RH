import { prisma } from "../../database/db";

export const ListarBanco = async (query: any) => {
  const { id, nome_banco, codigo, sigla } = query;

  // Construir dinamicamente o objeto de condições
  const where: any = {};

  if (id) where.id = Number(id);
  if (nome_banco)
    where.nome_banco = { equals: nome_banco, mode: "insensitive" };
  if (codigo) where.codigo = { equals: codigo, mode: "insensitive" };
  if (sigla) where.sigla = { equals: sigla, mode: "insensitive" };

  // Log para depuração
  console.log("Query conditions:", where);

  // Consultar o banco de dados
  const dados = await prisma.banco.findMany({ where });
  return dados;
};
