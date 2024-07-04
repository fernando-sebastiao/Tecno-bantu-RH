import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import {
  DadosProfissionaisProps,
  FiltrarDadosProfissionais,
} from "../../models/DadosProfissionais/FilterDadosProfissionais";
import { CreateDadosProfissionais } from "../../models/DadosProfissionais/createDadosProfissionais";
import { destroyDadosProfissionais } from "../../models/DadosProfissionais/destroyDadosProfissionais";
import { getbyIdDadosProfissionais } from "../../models/DadosProfissionais/getbyId";
import { updateDadosProfissionais } from "../../models/DadosProfissionais/updateDadosProfissionais";
import { schemaDadosProfissionais } from "../../utils/Validations/validatedadosProfissionais";

export const createDadosProfissionaisController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Validar os dados com Zod
    const parseFuncao = schemaDadosProfissionais.safeParse(req.body);
    if (!parseFuncao.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseFuncao.error.errors.map(
          (error) => `${error.path[0]}: ${error.message}`
        )
      );
    }
    //verificar se o dados já existe
    const verificar = await prisma.dadosProfissionais.findFirst({
      where: { numero_despacho: parseFuncao.data.numero_despacho },
    });
    if (verificar) {
      throw new CustomError("Este dados já existe", 400, [
        "Este dados já existe",
      ]);
    }
    //verificando o funcionário
    const verificarFuncionario = await prisma.funcionario.findFirst({
      where: {
        id: parseFuncao.data.Id_funcionario,
      },
    });
    if (!verificarFuncionario) {
      throw new CustomError("Funcionário não existe", 400, [
        "Funcionário não existe",
      ]);
    }
    //criando Dados de Profissional
    const dados = await CreateDadosProfissionais(parseFuncao.data);

    return res
      .status(201)
      .json({ massage: "Dado de Profissional criado com sucesso!✔", dados });
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};

export const updateDadosProfissionaisController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    // Verificar se o banco existe
    const verificar = await prisma.dadosProfissionais.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!verificar) {
      throw new CustomError("Data Not Found", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Validar os dados
    const verificarDado = schemaDadosProfissionais.safeParse(req.body);

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
    const dados = await updateDadosProfissionais({
      id: Number(id),
      contrato: verificarDado.data.contrato,
      Id_funcionario: verificarDado.data.Id_funcionario,
      numero_despacho: verificarDado.data.numero_despacho,
      data_admissao: verificarDado.data.data_admissao,
      data_despacho: verificarDado.data.data_despacho,
    });

    return res.json({
      Error: false,
      message: "Dados do Profissional atualizado com sucesso!✔",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

//Delete dados de Profissional
export const deleteDadosProfissionaisController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const categoria = await prisma.dadosProfissionais.findFirst({
      where: { id: Number(id) },
    });

    if (!categoria) {
      throw new CustomError("Dados de Profissional não encontrado!", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Fazer o delete
    const dados = await destroyDadosProfissionais(Number(id));

    return res.json({
      Error: false,
      message: "Dados de Profissional deletado com sucesso ✔",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
// Consultar o Id
export const getbyIdDadosProfissionaisController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const verificar = await prisma.dadosProfissionais.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!verificar) {
      throw new CustomError("Dados de Profissional não encontrado!", 400, [
        "Dados de Profissional não foi encontrado!👾",
      ]);
    }
    //trazendo os dados
    const dados = await getbyIdDadosProfissionais(Number(id));
    return res.status(200).json(dados);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

//filtrar dados profissionais
export const FiltrarDadosProfissionaisController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as DadosProfissionaisProps;
    const categoria = await FiltrarDadosProfissionais(query);
    if (categoria.length === 0) {
      throw new CustomError("Sem resultados!", 400, ["Sem resultados!👾"]);
    }
    return res.status(200).json(categoria);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
