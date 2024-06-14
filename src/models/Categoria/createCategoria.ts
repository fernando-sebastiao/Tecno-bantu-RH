import { prisma } from "../../database/db";
import { CategoriaDTO } from "../../utils/DTOs/CreateCategoriaDTO";

//criar categoria
export const CreateCategoria = async ({
  nome_categoria,
  salario_base,
  Id_carreira,
  Id_subCarreira,
}: CategoriaDTO) => {
  //criando categoria
  const dados = await prisma.categoriaRH.create({
    data: {
      nome_categoria,
      salario_base,
      Id_carreira,
      Id_subCarreira,
    },
  });
  return dados;
};
