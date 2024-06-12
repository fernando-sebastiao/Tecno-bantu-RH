import { prisma } from "../../database/db";
import { BancoDTO } from "../../utils/DTOs/CreateBancoDTO";

export const updateBanco = async ({
  id,
  nome_banco,
  codigo,
  sigla,
}: BancoDTO) => {
  //Fazendo o update no Banco
  const dados = await prisma.banco.update({
    where: { id },
    data: {
      nome_banco,
      codigo,
      sigla,
    },
  });
  return dados;
};
