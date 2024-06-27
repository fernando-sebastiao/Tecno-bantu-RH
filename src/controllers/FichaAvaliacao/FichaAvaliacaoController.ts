import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { UpdateFichaAvaliacao } from "../../models/FichaAvaliacao/UpdateFichaAvaliacao";
import { CreateFichaAvaliacao } from "../../models/FichaAvaliacao/createFichaAvaliacao";
import { destroyFichaAvaliacao } from "../../models/FichaAvaliacao/destroy";
import { ListarFichaAvaliacaoById } from "../../models/FichaAvaliacao/getallbyIdFichaAvaliacao";
import { FichaAvaliacaoSchema } from "../../utils/Validations/validateFichaAvaliacao";

export const createFichaAvaliacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //verificar a validação
    const parseFichaAvaliacao = FichaAvaliacaoSchema.safeParse(req.body);
    if (!parseFichaAvaliacao.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseFichaAvaliacao.error.errors.map((error) => error.message)
      );
    }
    //verificar se o nome da Ficha Avaliação já existe
    const verificar = await prisma.fichaAvaliacao.findFirst({
      where: { nome_ficha: parseFichaAvaliacao.data.nome_ficha },
    });
    if (verificar) {
      throw new CustomError("Esta Ficha de Avaliação já existe", 400, [
        "Este Ficha de Avaliação já existe",
      ]);
    }
    //criando a Ficha Avaliação
    const dados = await CreateFichaAvaliacao(parseFichaAvaliacao.data);
    return res
      .status(201)
      .json({ massage: "Ficha de Avaliação Criada!!", dados });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
    next(err);
  }
};

export const getbyIdFichaAvaliacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const avaliacao = await prisma.fichaAvaliacao.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!avaliacao) {
      throw new CustomError("Ficha de Avaliação não encontrada!", 400, [
        "Ficha de avaliação não encontrada!",
      ]);
    }
    const FichaAvaliacao = await ListarFichaAvaliacaoById(Number(id));
    return res.status(200).json(FichaAvaliacao);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
    next(err); // Passa o erro para o middleware de tratamento de erros;
  }
};

//Deletando Ficha de Avaliação
export const deleteFichaAvaliacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const fichaAvaliacao = await prisma.fichaAvaliacao.findFirst({
      where: { id: Number(id) },
    });

    if (!fichaAvaliacao) {
      throw new CustomError("Ficha de Avaliacao não encontrada", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Fazer o delete da fichaAvaliacao
    const dados = await destroyFichaAvaliacao(Number(id));

    return res.json({
      Error: false,
      message: "Ficha de Avaliação Deletada com sucesso",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};

//Atualizar a Ficha de Avaliação
export const updateFichaAvaliacaoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    // Verificar se a Ficha de Avaliação existe
    const verificar = await prisma.fichaAvaliacao.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!verificar) {
      throw new CustomError("Ficha de Avaliação não encontrada!", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Validar os dados
    const verificarDado = FichaAvaliacaoSchema.safeParse(req.body);

    if (!verificarDado.success) {
      // Filtrar especificamente o erro de nome_ficha.nonempty
      const nomeFichaAvaliacao = verificarDado.error.errors.find(
        (error) =>
          error.path.includes("nome_ficha") &&
          error.message === "O nome não pode ser enviado vázio!"
      );

      if (nomeFichaAvaliacao) {
        throw new CustomError("Erro de Validação", 400, [
          nomeFichaAvaliacao.message,
        ]);
      } else {
        // Se não for o erro de nome_ficha.nonempty, lançar todos os erros de validação
        throw new CustomError(
          "Erro de Validação",
          400,
          verificarDado.error.errors.map((error) => error.message)
        );
      }
    }

    // Atualizar os dados
    const dados = await UpdateFichaAvaliacao({
      id: Number(id),
      nome_ficha: verificarDado.data.nome_ficha,
      objetivo: verificarDado.data.objetivo,
    });

    return res.json({
      Error: false,
      message: "Ficha de Avaliação atualizada com sucesso",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
    next(err);
  }
};
