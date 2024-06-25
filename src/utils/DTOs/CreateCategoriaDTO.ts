export interface CategoriaDTO {
  id?: number;
  nome_categoria: string;
  salario_base: number;
  Id_carreira?: number | null;
  Id_subCarreira?: number | null;
}
