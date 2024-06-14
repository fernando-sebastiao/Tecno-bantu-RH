import { prisma } from "../../database/db";
import { CategoriaDTO } from "../../utils/DTOs/CreateCategoriaDTO";

export const updateCategoria = async ({
  id,
  nome_categoria,
  salario_base,
  Id_carreira,
  Id_subCarreira,
}: CategoriaDTO) => {
  //Fazendo o update no Banco
  const dados = await prisma.categoriaRH.update({
    where: { id },
    data: {
      nome_categoria,
      salario_base,
      Id_carreira,
      Id_subCarreira,
    },
  });
  return dados;
};
