import { z } from "zod";

export const schemaPublicacao = z.object({
  titulo: z.string({ message: "O titulo precisa receber textos!" }),
  entidade: z.string(),
  ano: z.date({ message: "Precisa ser do formato data!" }),
  tipo: z.enum(["livro", "cientifico", "outro"], {message: "O valor digitado não faz parte do tipo de dado!"}),
});
