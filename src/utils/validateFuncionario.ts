import { date, number, string, z } from "zod";

export const funcionarioSchema = z.object({
  nome_completo: string()
    .min(8, { message: "O nome precisa ter no minímo 8 caracteres!" })
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  nome_mae: string()
    .min(8, {
      message: "O nome precisa ter no minímo 8 caracteres!",
    })
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((palavra) => {
          return palavra[0].toLocaleUpperCase().concat(palavra.substring(1));
        })
        .join(" ");
    }),
  nome_pai: string()
    .min(8, {
      message: "O nome precisa ter no minímo 8 caracteres!",
    })
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  nascimento: date({ message: "Precisa digitar em formato de Data!" }),
  email: string()
    .nonempty("O e-mail é obrigatório!")
    .email("Formato de e-mail inválido"),
  genero: z.enum(["masculino", "feminino"]),
  tipo_identificacao: z.enum(["BI", "Passaporte", "Residente", "Outro"]),
  num_identificacao: z.string(),
  nivel_academico: z.enum([
    "Base",
    "Medio",
    "Universitario",
    "Licenciado",
    "Mestrado",
    "Doctoramento",
  ]),
  avatar: string().optional(),
  telefone1: string().min(9, {
    message: "O número de telefone precisa ter no minímo 9 caracteres!",
  }),
  telefone2: string()
    .min(9, {
      message: "O número de telefone precisa ter no minímo 9 caracteres!",
    })
    .optional(),
  linkedin: z.string().optional(),
  whatsApp: z.string().optional(),
  instagram: z.string().optional(),
  bairro: z.string(),
  rua: string(),
  id_funcao: number({ message: "Este campo precisa receber um número!" })
    .int({ message: "O número deve ser inteiro!" })
    .positive({ message: "O número precisa ser posito!" }),
  id_categoria: number({ message: "Este campo precisa receber um número!" })
    .int({ message: "O número deve ser inteiro!" })
    .positive({ message: "O número precisa ser posito!" }),
  num_conta: z.string().optional(),
  iban: z.string().transform((iban) => {
    return iban
      .trim()
      .split("")
      .map((valor) => {
        return valor.concat("AOA");
      })
      .join("");
  }),
  Id_banco: number({ message: "Este campo precisa receber um número!" })
    .int({ message: "O número deve ser inteiro!" })
    .positive({ message: "O número precisa ser posito!" }),
});
