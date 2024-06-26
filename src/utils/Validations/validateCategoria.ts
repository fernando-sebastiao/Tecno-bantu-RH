import { z } from "zod";

export const categoriaSchema = z.object({
  nome_categoria: z
    .string()
    .min(3, {
      message: "O nome precisa ter no minímo 3 caracteres",
    })
    .nonempty({ message: "O nome não pode ser enviado vázio!" }),
  salario_base: z
    .number()
    .int()
    .positive({ message: "O número precisa ser positivo" }),
  Id_carreira: z
    .number()
    .nonnegative({
      message: "O número não pode ser negativo",
    })
    .optional(),
  Id_subCarreira: z
    .number()
    .int()
    .positive({ message: "O número precisa ser positivo" })
    .optional(),
});
