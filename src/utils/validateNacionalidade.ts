import { z } from "zod";

export const nacionalidadeSchema = z.object({
  name: z
    .string()
    .min(1, { message: "O nome precisa ter no minímo 20 caracteres!" }),
});
