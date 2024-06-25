import { number, string, z } from "zod";

export const categoriaSchema = z.object({
  nome_categoria: string()
    .min(3, {
      message: "O nome precisa ter no minímo 3 caracteres",
    })
    .nonempty({ message: "O nome não pode ser enviado vázio!" }),
  salario_base: number()
    .int()
    .positive({ message: "O número precisa ser positivo" }),
  Id_carreira:
    number()
      .nonnegative({
        message: "O número não pode ser negativo",
      })
      .optional() || null,
  Id_subCarreira:
    number()
      .int()
      .positive({ message: "O número precisa ser positivo" })
      .optional() || null,
});
