export interface FuncionarioDTO {
  id?: number;
  nome_completo: string;
  nome_pai: string;
  nome_mae: string;
  nascimento: Date;
  email: string;
  genero: string;
  tipo_identificacao: string;
  num_identificacao: number;
  nivel_academico: string;
  avatar?: string;
  telefone1: string;
  telefone2?: string;
  linkedin?: string;
  whatsApp?: string;
  instagram?: string;
  bairro: string;
  rua: string;
  id_funcao: number;
  id_categoria: number;
  num_conta?: string;
  iban: string;
  Id_banco: number;
}
