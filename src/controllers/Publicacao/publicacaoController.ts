import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { UpdatePublicacao } from "../../models/Publicacao/UpdatePublicacao";
import { CreatePublicacao } from "../../models/Publicacao/createPublicacao";
import { destroyPublicacao } from "../../models/Publicacao/destroyPublicacao";
import {
  FiltrarPublicacao,
  PublicacaoProps,
} from "../../models/Publicacao/filtrarPublicacao";
import { getbyIdPublicacao } from "../../models/Publicacao/getbyId";
import { schemaPublicacao } from "../../utils/Validations/validatePublicacao";

export const createPublicacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validar os dados com Zod
    const parsePublicacao = schemaPublicacao.safeParse(req.body);
    if (!parsePublicacao.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parsePublicacao.error.errors.map((error) => error.message)
      );
    }

    // Criando uma nova Publicação
    const dados = await CreatePublicacao(parsePublicacao.data);

    return res.status(201).json({ message: "Post Created!", dados });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

//Deletar Publicacao
export const deletePublicacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const funcao = await prisma.publicacoes.findFirst({
      where: { id: Number(id) },
    });

    if (!funcao) {
      throw new CustomError("Publicação não encontrada", 400, [
        "Publicação não encontrada!",
      ]);
    }

    // Fazer o delete da Publicação
    const dados = await destroyPublicacao(Number(id));

    return res.json({
      Error: false,
      message: "Publicação Deletada com sucesso",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

export const updatePublicacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    // Verificar se a publicação existe
    const verificar = await prisma.publicacoes.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!verificar) {
      throw new CustomError("Publicação não encontrada", 400, [
        "Publicação não encontrada!",
      ]);
    }

    // Validar os dados
    const verificarDado = schemaPublicacao.safeParse(req.body);

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
    const dados = await UpdatePublicacao({
      id: Number(id),
      tipo: verificarDado.data.tipo,
      titulo: verificarDado.data.titulo,
      entidade: verificarDado.data.entidade,
      ano: verificarDado.data.ano,
    });

    res.json(dados);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

//Para filtrar Publicação
export const FiltrarPublicacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as PublicacaoProps;

    const dados = FiltrarPublicacao(query);
    if ((await dados).length === 0) {
      throw new CustomError("Carreira não encontrada", 400, [
        "Carreira não foi encontrada!",
      ]);
    }
    return res.status(200).json(dados);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};
export const getbyIdPublicacaoController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const verificar = await prisma.publicacoes.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!verificar) {
      throw new CustomError("Banco não encontrado!", 400, [
        "O Banco não foi encontrado!",
      ]);
    }
    //trazendo os dados
    const dados = await getbyIdPublicacao(Number(id));
    return res.status(200).json(dados);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
