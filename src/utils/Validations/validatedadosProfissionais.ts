import { z } from "zod";

export const schemaDadosProfissionais = z.object({
  data_admissao: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ano deve ser uma data válida",
  }),
  numero_despacho: z.string(),
  data_despacho: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ano deve ser uma data válida",
  }),
  contrato: z.enum(["CTD", "CAP"]),
  Id_funcionario: z
    .number()
    .int()
    .positive({ message: "O número deve ser positivo!" }),
});
