import { z } from "zod";

export const schemaExperiencialLaboral = z.object({
  ano_inicio: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ano deve ser uma data válida",
  }),
  ano_termino: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ano deve ser uma data válida",
  }),
  funcao: z.string(),
  instituicao: z.string(),
  pais: z.string(),
  Id_funcionario: z
    .number()
    .int({ message: "O número deve ser inteiro!" })
    .positive({ message: "O número deve ser positivo!" })
    .optional(),
});
