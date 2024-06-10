import { z } from "zod";

export const funcaoSchema = z.object({
  nome_funcao: z
    .string()
    .min(12, { message: "O nome precisa ter no minímo 20 caracteres!" }),
});
