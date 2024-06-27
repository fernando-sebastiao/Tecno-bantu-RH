import { prisma } from "../../database/db";

export interface CategoriaProps {
  nome_categoria?: string;
  salario_base?: number;
  Id_carreira?: number | null;
  Id_subCarreira?: number | null;
}

export const FiltrarCategoria = async (query: CategoriaProps) => {
  const { nome_categoria, salario_base, Id_carreira, Id_subCarreira } = query;

  const dados = await prisma.categoriaRH.findMany({
    where: {
      nome_categoria: {
        contains: nome_categoria || "", // Garante que se nome_categoria for undefined, a condição seja ignorada
        mode: "insensitive",
      },
      salario_base: salario_base ? { equals: salario_base } : undefined, // Filtra por igualdade se salario_base estiver definido
      Id_carreira: Id_carreira ? { equals: Id_carreira } : undefined, // Filtra por igualdade se Id_carreira estiver definido
      Id_subCarreira: Id_subCarreira ? { equals: Id_subCarreira } : undefined, // Filtra por igualdade se Id_subCarreira estiver definido
    },
  });

  return dados;
};
