import { z } from "zod";

export const departamentoSchema = z.object({
  nome_departamento: z
    .string()
    .min(3, { message: "O nome precisa ter no minímo 3 caracteres!" })
    .nonempty({ message: "O nome não pode ser enviado vázio!" }),
  Id_funcionario_chefe: z
    .number()
    .int("O número precisa ser inteiro!")
    .positive("O número precisa ser positivo!"),
  Id_funcionario_supervisor: z.number().int().positive(),
});
