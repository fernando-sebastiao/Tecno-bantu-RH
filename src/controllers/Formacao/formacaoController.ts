import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { CreateFormacao } from "../../models/Formacao/createFormacao";
import { destroyFormacao } from "../../models/Formacao/destroy";
import {
  FiltrarFormacao,
  FormacaoDTOProps,
} from "../../models/Formacao/filtrar";
import { ListarFormacaoById } from "../../models/Formacao/getbyId";
import { UpdateFormacao } from "../../models/Formacao/updateFormacao";
import { schemaFormacoes } from "../../utils/Validations/validateFormacoes";

export const createFormacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Validar os dados com Zod
    const parseFormacao = schemaFormacoes.safeParse(req.body);
    if (!parseFormacao.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseFormacao.error.errors.map(
          (error) => `${error.path[0]}: ${error.message}`
        )
      );
    }
    //verificar se o dados já existe
    const verificar = await prisma.formacoes.findFirst({
      where: { formacao: parseFormacao.data.formacao },
    });
    if (verificar) {
      throw new CustomError("Esta Formação já existe!", 400, [
        "Este Formação já existe!",
      ]);
    }
    //verificando o funcionário
    const verificarFuncionario = await prisma.funcionario.findFirst({
      where: {
        id: parseFormacao.data.Id_funcionario,
      },
    });
    if (!verificarFuncionario) {
      throw new CustomError("Funcionário não existe!", 400, [
        "Funcionário não existe!",
      ]);
    }
    //criando a Formação
    const dados = await CreateFormacao(parseFormacao.data);

    return res
      .status(201)
      .json({ massage: "Formação criada com sucesso!✔", dados });
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};

//Atualizar Formacao
export const updateFormacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    // Verificar se o banco existe
    const verificar = await prisma.formacoes.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!verificar) {
      throw new CustomError("Formation Not Found", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Validar os dados
    const verificarDado = schemaFormacoes.safeParse(req.body);

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
    const dados = await UpdateFormacao({
      id: Number(id),
      ...verificarDado.data,
    });

    return res.json({
      Error: false,
      message: "Categoria atualizada com sucesso!✔",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

//Deletar Formação
export const deleteFormacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const Formacao = await prisma.formacoes.findFirst({
      where: { id: Number(id) },
    });

    if (!Formacao) {
      throw new CustomError("Formação não encontrada", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Fazer o delete da Formação
    const dados = await destroyFormacao(Number(id));

    return res.json({
      Error: false,
      message: "Formação deletada com sucesso!✔",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
//Consultar Formação
export const getbyIdFormacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const formacao = await prisma.formacoes.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!formacao) {
      throw new CustomError("Formação não encontrada!", 400, [
        "Formação não encontrada!",
      ]);
    }
    const dados = await ListarFormacaoById(Number(id));
    return res.status(200).json(dados);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

//Filtrar Formação
export const FiltrarFormacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as FormacaoDTOProps;
    const Formacao = await FiltrarFormacao(query);
    if (Formacao.length === 0) {
      throw new CustomError("Sem resultados!", 400, ["Sem resultados!"]);
    }
    return res.status(200).json(Formacao);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
