import { prisma } from "../../database/db";
import { BancoDTO } from "../../utils/DTOs/CreateBancoDTO";

export const CreateBanco = async ({ nome_banco, codigo, sigla }: BancoDTO) => {
  //criando o banco
  const dados = await prisma.banco.create({
    data: { nome_banco, codigo, sigla },
  });
  return dados;
};
