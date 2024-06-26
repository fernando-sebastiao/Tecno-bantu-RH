import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { CreateDepartamento } from "../../models/Departamento/createDepartamento";
import { departamentoSchema } from "../../utils/Validations/validateDepartamento";

export const createDepartamentoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //verificar a validação
    const parseDepartamento = departamentoSchema.safeParse(req.body);
    if (!parseDepartamento.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseDepartamento.error.errors.map((error) => error.message)
      );
    }
    //verificar se o departamento já existe
    const verificar = await prisma.departamento.findFirst({
      where: { nome_departamento: parseDepartamento.data.nome_departamento },
    });
    if (verificar) {
      throw new CustomError("This Departamento already exists", 400, [
        "Este Departamento já existe",
      ]);
    }
    //verificar se o funcionario chefe existe
    const verificarfuncionarioChefe = await prisma.funcionario.findFirst({
      where: {
        id: parseDepartamento.data.Id_funcionario_chefe,
      },
    });
    if (!verificarfuncionarioChefe) {
      throw new CustomError("Este Funcionário não existe!", 400, [
        "Este Funcionário não existe",
      ]);
    }
    //verificar se o funcionário supervisor existe
    const verificarfuncionarioSupervisor = await prisma.funcionario.findFirst({
      where: {
        id: parseDepartamento.data.Id_funcionario_supervisor,
      },
    });

    const dados = await CreateDepartamento(parseDepartamento.data);
    return res.status(201).json({ massage: "Created Funcionario!", dados });
  } catch (err) {
    next(err);
  }
};
