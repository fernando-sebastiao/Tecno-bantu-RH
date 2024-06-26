import { z } from "zod";

export const FichaAvaliacaoSchema = z.object({
  nome_ficha: z
    .string()
    .min(3, { message: "O nome precisa ter no minímo 3 caracteres!" })
    .nonempty({ message: "O nome não pode ser enviado vázio!" }),
  objetivo: z.string().optional(),
});
