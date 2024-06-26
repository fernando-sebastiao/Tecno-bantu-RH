import { z } from "zod";

export const CarreiraSchema = z.object({
  nome_carreira: z
    .string()
    .min(3, { message: "O nome precisa ter no minímo 3 caracteres" })
    .nonempty({ message: "O nome não pode ser enviado vázio!" }),
  regime: z.enum(["geral", "especial"], {
    message: "O Regime somente deve ser geral ou especial!",
  }),
});
