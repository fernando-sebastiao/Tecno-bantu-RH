import { number, string, z } from "zod";

export const categoriaSchema = z.object({
  nome_categoria: string()
    .min(3, {
      message: "O nome precisa ter no minímo 3 caracteres",
    })
    .nonempty({ message: "O nome não pode ser enviado vázio!" }),
  salario_base: number().nonnegative({
    message: "O número não pode ser negativo",
  }),
  Id_carreira: number().nonnegative({
    message: "O número não pode ser negativo",
  }),
  Id_subCarreira: number().nonnegative({
    message: "O número não pode ser negativo",
  }),
});
