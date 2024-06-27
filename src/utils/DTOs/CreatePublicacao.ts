export interface PublicacaoDTO {
  id?: number;
  titulo: string;
  ano: string;
  tipo: "livro" | "cientifico" | "outro";
  entidade: string;
}
