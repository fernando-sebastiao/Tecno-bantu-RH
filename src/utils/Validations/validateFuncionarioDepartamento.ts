import { z } from "zod";
export const schemaFuncionarioDepartamento = z.object({
  Id_departamento: z
    .number({ message: "Este campo só deve receber número!" })
    .int({ message: "Este campo é o tipo inteiro!" })
    .positive("Este campo deve ser positivo!")
    .optional(),
  Id_funcionario: z
    .number({ message: "Este campo só deve receber número!" })
    .int({ message: "Este campo é o tipo inteiro!" })
    .positive("Este campo deve ser positivo!")
    .optional(),
});
