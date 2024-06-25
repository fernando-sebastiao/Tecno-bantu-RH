export interface FuncionarioDTO {
  id?: number;
  nome_completo: string;
  nome_pai: string;
  nome_mae: string;
  nascimento: Date;
  email: string;
  genero: "masculino" | "feminino";
  tipo_identificacao: "BI" | "Passaporte" | "Residente" | "Outro";
  num_identificacao: string;
  nivel_academico:
    | "Medio"
    | "Base"
    | "Universitario"
    | "Licenciado"
    | "Mestrado"
    | "Doctoramento";
  avatar?: string;
  telefone1: string;
  telefone2?: string;
  linkedin?: string;
  whatsApp?: string;
  instagram?: string;
  bairro: string;
  rua: string;
  id_funcao?: number;
  id_categoria?: number;
  num_conta?: string;
  iban: string;
  Id_banco?: number;
}
