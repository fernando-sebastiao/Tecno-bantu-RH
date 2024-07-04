import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { CreateExperencialLaboral } from "../../models/ExperencialLaboral/createExpLaboral";
import { destroyExperencialLaboral } from "../../models/ExperencialLaboral/destroy";
import {
  ExperencilLaboralProps,
  FiltrarExperencialLaboral,
} from "../../models/ExperencialLaboral/filtrar";
import { getbyIdExperencialLaboral } from "../../models/ExperencialLaboral/getbyId";
import { UpdateExperencialLaboral } from "../../models/ExperencialLaboral/updateExperencialLaboral";
import { schemaExperiencialLaboral } from "../../utils/Validations/validateExperencialLaboracao";

export const createExperencialLaboralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //verificar a validação
    const parseDepartamento = schemaExperiencialLaboral.safeParse(req.body);
    if (!parseDepartamento.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseDepartamento.error.errors.map((error) => error.message)
      );
    }
    //verificar se o departamento já existe
    const verificar = await prisma.experiencialLaboral.findFirst({
      where: { funcao: parseDepartamento.data.funcao },
    });
    if (verificar) {
      throw new CustomError(
        "Already exists an Experience with this Function",
        400,
        ["Já existe uma Experiência Laboral com esta Função!"]
      );
    }
    //verificar se o funcionario chefe existe
    const verificarfuncionario = await prisma.funcionario.findFirst({
      where: {
        id: parseDepartamento.data.Id_funcionario,
      },
    });
    if (!verificarfuncionario) {
      throw new CustomError("Este Funcionário não existe!", 400, [
        "Este Funcionário Chefe não existe!",
      ]);
    }

    const dados = await CreateExperencialLaboral(parseDepartamento.data);
    return res.status(201).json({ massage: "Created Funcionario!", dados });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
//atualizar Experencial Laboral
export const updateExperencialLaboralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    // Verificar se o subCarreira existe
    const verificar = await prisma.experiencialLaboral.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!verificar) {
      throw new CustomError("Experience Laboral Not Found", 400, [
        "Experiencia Laboral não Encontrada! Por favor verifique o ID e tente novamente!",
      ]);
    }

    // Validar os dados
    const verificarDado = schemaExperiencialLaboral.safeParse(req.body);

    if (!verificarDado.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        verificarDado.error.errors.map(
          (error) => `${error.path[0]}: ${error.message}`
        )
      );
    }

    // Atualizar os dados
    const dados = await UpdateExperencialLaboral({
      id: Number(id),
      ...verificarDado.data,
    });

    return res.json({
      Error: false,
      message: "Experiencia Laboral atualizado com sucesso!✔",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
//Deletar Experencial Laboral
export const deleteExperencialLaboralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const banco = await prisma.experiencialLaboral.findFirst({
      where: { id: Number(id) },
    });

    if (!banco) {
      throw new CustomError("Experience Laboral Not Found", 400, [
        "Experience Laboral não encontrado! Por favor verifique o ID e tente novamente!",
      ]);
    }

    // Fazer o delete do Departamento
    const dados = await destroyExperencialLaboral(Number(id));

    return res.json({
      Error: false,
      message: "Experience Laboral deletado com sucesso!✔",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

//Consultar Experencial Laboral
export const getbyIdExperencialLaboralController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const verificar = await prisma.experiencialLaboral.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!verificar) {
      throw new CustomError("Experience Laboral Not Found!", 400, [
        "Experience Laboral não encontrado! Por favor verifique o ID e tente novamente!",
      ]);
    }
    //trazendo os dados
    const dados = await getbyIdExperencialLaboral(Number(id));
    return res.status(200).json(dados);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
//Filtrado Experencial Laboral
export const FiltrarExperencialLaboralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as ExperencilLaboralProps;
    const ExperencialLaboral = await FiltrarExperencialLaboral(query);
    if (ExperencialLaboral.length === 0) {
      throw new CustomError("Without results", 400, ["Sem resultados!"]);
    }
    return res.status(200).json(ExperencialLaboral);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
