import { prisma } from "../../database/db";

export interface FuncionarioProps {
  nome_completo?: string;
  nome_pai?: string;
  nome_mae?: string;
  nascimento?: string; // Nascimento é mantido como string para aceitar consultas parciais
  email?: string;
  genero?: "masculino" | "feminino";
  tipo_identificacao?: "BI" | "Passaporte" | "Residente" | "Outro";
  num_identificacao?: string;
  nivel_academico?:
    | "Medio"
    | "Base"
    | "Universitario"
    | "Licenciado"
    | "Mestrado"
    | "Doctoramento";
  avatar?: string;
  telefone1?: string;
  telefone2?: string;
  linkedin?: string;
  whatsApp?: string;
  instagram?: string;
  bairro?: string;
  rua?: string;
  id_funcao?: number;
  id_categoria?: number;
  num_conta?: string;
  iban?: string;
  Id_banco?: number;
}

export const FiltrarFuncionario = async (query: FuncionarioProps) => {
  const {
    nome_completo,
    nome_pai,
    nome_mae,
    nascimento,
    email,
    genero,
    tipo_identificacao,
    num_identificacao,
    nivel_academico,
    avatar,
    telefone1,
    telefone2,
    linkedin,
    whatsApp,
    instagram,
    bairro,
    rua,
    id_funcao,
    id_categoria,
    num_conta,
    iban,
    Id_banco,
  } = query;

  const dados = await prisma.funcionario.findMany({
    where: {
      nome_completo: {
        contains: nome_completo || "",
        mode: "insensitive",
      },
      nome_pai: {
        contains: nome_pai || "",
        mode: "insensitive",
      },
      nome_mae: {
        contains: nome_mae || "",
        mode: "insensitive",
      },
      nascimento: nascimento
        ? {
            equals: new Date(nascimento), // Converte a string de data para objeto Date
          }
        : undefined,
      email: {
        contains: email || "",
        mode: "insensitive",
      },
      genero: genero ? { equals: genero } : undefined,
      tipo_identificacao: tipo_identificacao
        ? { equals: tipo_identificacao }
        : undefined,
      num_identificacao: {
        contains: num_identificacao || "",
        mode: "insensitive",
      },
      nivel_academico: nivel_academico
        ? { equals: nivel_academico }
        : undefined,
      avatar: {
        contains: avatar || "",
        mode: "insensitive",
      },
      telefone1: {
        contains: telefone1 || "",
        mode: "insensitive",
      },
      telefone2: {
        contains: telefone2 || "",
        mode: "insensitive",
      },
      linkedin: {
        contains: linkedin || "",
        mode: "insensitive",
      },
      whatsApp: {
        contains: whatsApp || "",
        mode: "insensitive",
      },
      instagram: {
        contains: instagram || "",
        mode: "insensitive",
      },
      bairro: {
        contains: bairro || "",
        mode: "insensitive",
      },
      rua: {
        contains: rua || "",
        mode: "insensitive",
      },
      id_funcao: id_funcao ? { equals: id_funcao } : undefined,
      id_categoria: id_categoria ? { equals: id_categoria } : undefined,
      num_conta: {
        contains: num_conta || "",
        mode: "insensitive",
      },
      iban: {
        contains: iban || "",
        mode: "insensitive",
      },
      Id_banco: Id_banco ? { equals: Id_banco } : undefined,
    },
  });

  return dados;
};
