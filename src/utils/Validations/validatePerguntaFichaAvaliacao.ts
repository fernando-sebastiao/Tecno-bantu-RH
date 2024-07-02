import { z } from "zod";

export const schemaPerguntaFichaAvaliacão = z.object({
  competenciaId: z
    .number({ message: "Este campo só deve receber número!" })
    .int({ message: "Este campo é o tipo inteiro!" })
    .positive("Este campo deve ser positivo!")
    .optional(),
  fichaAvaliacaoId: z
    .number({ message: "Este campo só deve receber número!" })
    .int({ message: "Este campo é o tipo inteiro!" })
    .positive("Este campo deve ser positivo!")
    .optional(),
  descricao: z.string(),
  nivel_esperado: z.number(),
});
