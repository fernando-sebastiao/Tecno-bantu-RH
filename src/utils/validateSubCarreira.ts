import { z } from "zod";

export const SubCarreiraSchema = z.object({
  nome_SubCarreira: z
    .string()
    .min(3, { message: "O nome precisa ter no minímo 3 caracteres" }),
  Id_carreira: z
    .number()
    .int()
    .positive({ message: "O número precisa ser positivo" })
    .optional(),
});
