import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import {
  DepartamentoProps,
  FiltrarDepartamento,
} from "../../models/Departamento/FiltrarDepartamento";
import { UpdateDepartamento } from "../../models/Departamento/UpdateDepartamento";
import { CreateDepartamento } from "../../models/Departamento/createDepartamento";
import { destroyDepartamento } from "../../models/Departamento/destroyDepartamento";
import { getbyIdDepartamento } from "../../models/Departamento/getbyId";
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
        "Este Funcionário Chefe não existe!",
      ]);
    }
    //verificar se o funcionário supervisor existe
    const verificarfuncionarioSupervisor = await prisma.funcionario.findFirst({
      where: {
        id: parseDepartamento.data.Id_funcionario_supervisor,
      },
    });
    if (!verificarfuncionarioSupervisor) {
      throw new CustomError("Este Funcionário não existe!", 400, [
        "Este Funcionário Supervisor não existe!",
      ]);
    }

    const dados = await CreateDepartamento(parseDepartamento.data);
    return res.status(201).json({ massage: "Created Funcionario!", dados });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

export const updateDepartamentoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    // Verificar se o subCarreira existe
    const verificar = await prisma.departamento.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!verificar) {
      throw new CustomError("Departament Not Found", 400, [
        "Departamento não Encontrado",
      ]);
    }

    // Validar os dados
    const verificarDado = departamentoSchema.safeParse(req.body);

    if (!verificarDado.success) {
      // Filtrar especificamente o erro de nome_departamentos.nonempty
      const nomeBancoError = verificarDado.error.errors.find(
        (error) =>
          error.path.includes("nome_SubCarreira") &&
          error.message === "O nome não pode ser enviado vázio!"
      );

      if (nomeBancoError) {
        throw new CustomError("Erro de Validação", 400, [
          nomeBancoError.message,
        ]);
      } else {
        // Se não for o erro de nome_departamento.nonempty, lançar todos os erros de validação
        throw new CustomError(
          "Erro de Validação",
          400,
          verificarDado.error.errors.map((error) => error.message)
        );
      }
    }

    // Atualizar os dados
    const dados = await UpdateDepartamento({
      id: Number(id),
      nome_departamento: verificarDado.data.nome_departamento,
      Id_funcionario_chefe: verificarDado.data.Id_funcionario_chefe,
      Id_funcionario_supervisor: verificarDado.data.Id_funcionario_supervisor,
    });

    return res.json({
      Error: false,
      message: "Departamento atualizado com sucesso",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
//Deletar departamento
export const deleteDepartamentoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const banco = await prisma.departamento.findFirst({
      where: { id: Number(id) },
    });

    if (!banco) {
      throw new CustomError("Departamento não encontrado", 400, [
        "Departamento não encontrado!",
      ]);
    }

    // Fazer o delete do Departamento
    const dados = await destroyDepartamento(Number(id));

    return res.json({
      Error: false,
      message: "Departamento Deletado com sucesso",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
export const FiltrarDepartamentoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as DepartamentoProps;
    const categoria = await FiltrarDepartamento(query);
    if (categoria.length === 0) {
      throw new CustomError("Departamento não encontrado", 400, [
        "Departamento não encontrado!!",
      ]);
    }
    return res.status(200).json(categoria);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

export const getbyIdDepartamentoController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const verificar = await prisma.departamento.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!verificar) {
      throw new CustomError("Departamento não encontrado!", 400, [
        "O departamento não foi encontrado!",
      ]);
    }
    //trazendo os dados
    const dados = await getbyIdDepartamento(Number(id));
    return res.status(200).json(dados);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
