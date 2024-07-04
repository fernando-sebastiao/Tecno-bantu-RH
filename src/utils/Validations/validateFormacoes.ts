import { z } from "zod";
export const schemaFormacoes = z.object({
  ano_inicio: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ano deve ser uma data válida",
  }),
  ano_termino: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ano deve ser uma data válida",
  }),
  formacao: z.string(),
  pais: z.string(),
  instituicao: z.string(),
  Id_funcionario: z.number().optional(),
});
