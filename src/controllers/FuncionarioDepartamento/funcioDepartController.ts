import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { createFuncionarioDepartamento } from "../../models/FuncionarioDepartamento/createFuncionarioDepartamento";
import { destroyFuncionarioDepartamento } from "../../models/FuncionarioDepartamento/destroy";
import { FiltrarFuncionarioDepartamento } from "../../models/FuncionarioDepartamento/filtrarFuncioDepartamento";
import { getbyIdFuncionarioDepartamento } from "../../models/FuncionarioDepartamento/getbyId";
import { UpdateFuncionarioDepartamento } from "../../models/FuncionarioDepartamento/updateFuncionDepart";
import { FuncionarioDepartamentoDTO } from "../../utils/DTOs/CreateFuncionarioDepartamento";
import { schemaFuncionarioDepartamento } from "../../utils/Validations/validateFuncionarioDepartamento";

export const createFuncionarioDepartamentoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //verificar a validação
    const parseFuncionarioDepartamento =
      schemaFuncionarioDepartamento.safeParse(req.body);
    if (!parseFuncionarioDepartamento.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseFuncionarioDepartamento.error.errors.map(
          (error) => `${error.path[0]}: ${error.message}`
        )
      );
    }
    //verificar se o Departamento existe
    const verificarDepartamento = await prisma.departamento.findFirst({
      where: {
        id: parseFuncionarioDepartamento.data.Id_departamento,
      },
    });
    if (!verificarDepartamento) {
      throw new CustomError("Este Departamento não existe!", 400, [
        "Este Departamento não existe!",
      ]);
    }
    //verificar se o Funcionario existe
    const verificarFuncionario = await prisma.funcionario.findFirst({
      where: {
        id: parseFuncionarioDepartamento.data.Id_funcionario,
      },
    });
    if (!verificarFuncionario) {
      throw new CustomError("Este Funcionário não existe!", 400, [
        "Este Funcionário não existe!❌",
      ]);
    }
    //criar Funcionário de Departameto
    const dados = await createFuncionarioDepartamento(
      parseFuncionarioDepartamento.data
    );
    return res
      .status(201)
      .json({ massage: "Criado Funcionário de Departamento!✔", dados });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
//Filtrar Funcionário de Departamento
export const FiltrarFuncionarioDepartamentoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as FuncionarioDepartamentoDTO;
    //verificar se existe
    const dados = await FiltrarFuncionarioDepartamento(query);
    if (dados.length === 0) {
      throw new CustomError("Sem resultados!👾", 400, ["Sem resultados!🥺"]);
    }
    return res.status(200).json(dados);
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros;
  }
};

//Usuario Deletar Funcionario de um Departamento//
export const deleteFuncionarioDepartamentoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    //verificar se o Funcionário de Departamento existe
    const funcionarioDepartamento =
      await prisma.funcionarioDepartamento.findFirst({
        where: { id: Number(id) },
      });

    if (!funcionarioDepartamento) {
      throw new CustomError("Funcionário de departamento não encontrado", 400, [
        "Funcionário de departamento não encontrado!❌",
      ]);
    }

    // Fazer o delete da Função
    const dados = await destroyFuncionarioDepartamento(Number(id));

    return res.json({
      Error: false,
      message: "Funcionário de departamento delatado com sucesso!✔",
      dados,
    });
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};

//atualizando Funcionario de Departamento
export const updateFuncionarioDepartamentoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    // Verificar se o Funcionário Departamento existe
    const verificar = await prisma.funcionarioDepartamento.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!verificar) {
      throw new CustomError(
        "Este Funcionário de departamento não encontrado!",
        400,
        ["Funcionário de departamento não encontrado!❌"]
      );
    }

    // Validar os dados
    const verificarDado = schemaFuncionarioDepartamento.safeParse(req.body);

    if (!verificarDado.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        verificarDado.error.errors.map((error) => error.message)
      );
    }

    // Atualizar os dados
    const dados = await UpdateFuncionarioDepartamento({
      id: Number(id),
      Id_departamento: verificarDado.data.Id_departamento,
      Id_funcionario: verificarDado.data.Id_funcionario,
    });

    res.json(dados);
  } catch (err) {
    next(err);
  }
};

//Consultar pelo Id
export const getbyIdFuncionarioDepartamentoController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const verificar = await prisma.funcionarioDepartamento.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!verificar) {
      throw new CustomError(
        "Funcionário de Departamento não encontrado!❌",
        400,
        ["Funcionário de departamento não encontrado!🥺"]
      );
    }
    //trazendo os dados
    const dados = await getbyIdFuncionarioDepartamento(Number(id));
    return res.status(200).json(dados);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
