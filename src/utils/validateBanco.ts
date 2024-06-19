import { string, z } from "zod";

export const BancoSchema = z.object({
  nome_banco: string()
    .min(3, {
      message: "O nome precisa ter no minímo 3 caracteres",
    })
    .nonempty({ message: "O nome não pode ser enviado vázio!" }),
  codigo: string().min(3, {
    message: "O nome precisa ter no mínimo 1 caractere",
  }),
  sigla: string().min(2, {
    message: "A sigla precisa ter no minímo 2 caracteres",
  }),
});
