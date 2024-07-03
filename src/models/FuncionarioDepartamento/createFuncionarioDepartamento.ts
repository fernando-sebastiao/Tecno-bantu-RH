import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { FuncionarioDepartamentoDTO } from "../../utils/DTOs/CreateFuncionarioDepartamento";

export const createFuncionarioDepartamento = async ({
  Id_departamento,
  Id_funcionario,
}: FuncionarioDepartamentoDTO) => {
  try {
    const dados = await prisma.funcionarioDepartamento.create({
      data: { Id_departamento, Id_funcionario },
    });
    return dados;
  } catch (error) {
    throw new CustomError(`${error}`);
  }
};
