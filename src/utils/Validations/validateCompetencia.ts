import { z } from "zod";

export const competenciaSchema = z.object({
  nome_competencia: z
    .string()
    .min(8, { message: "O nome precisa ter no minímo 8 caracteres!" })
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  criterio: z.enum(["Comportamental", "Tecnico"], {
    message: "O critério só deve ser Comportamental ou Tecnico",
  }),
});
