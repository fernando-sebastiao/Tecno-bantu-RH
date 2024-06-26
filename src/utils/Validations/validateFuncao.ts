import { z } from "zod";

export const funcaoSchema = z.object({
  nome_funcao: z
    .string()
    .min(3, { message: "O nome precisa ter no minímo 3 caracteres!" })
    .nonempty({ message: "Os dados não pode ser enviados vázios!" }),
});
