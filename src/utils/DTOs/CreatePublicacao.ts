export interface PublicacaoDTO {
  id?: number;
  titulo: string;
  ano: Date;
  tipo: "livro" | "cientifico" | "outro";
  entidade: string;
}
