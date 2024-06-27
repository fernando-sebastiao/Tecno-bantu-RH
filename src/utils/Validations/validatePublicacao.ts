import { z } from "zod";

export const schemaPublicacao = z.object({
  titulo: z.string().nonempty({ message: "O título não pode estar vazio" }),
  entidade: z.string().nonempty({ message: "A entidade não pode estar vazia" }),
  ano: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ano deve ser uma data válida",
  }),
  tipo: z.enum(["cientifico", "livro", "outro"]),
});
