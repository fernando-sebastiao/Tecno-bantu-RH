import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { updateBanco } from "../../models/Banco/UpdateBanco";
import { CreateBanco } from "../../models/Banco/createBanco";
import { destroyBanco } from "../../models/Banco/destroy";
import { FiltrarBanco, propsal } from "../../models/Banco/filter";
import { getbyIdBanco } from "../../models/Banco/getbyId";
import { BancoSchema } from "../../utils/Validations/validateBanco";

//Usuário criar funcao
export const createBancoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Validar os dados com Zod
    const parseBanco = BancoSchema.safeParse(req.body);
    if (!parseBanco.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseBanco.error.errors.map(
          (error) => `${error.path[0]}: ${error.message}`
        )
      );
    }
    //verificar se o Banco já existe
    const verificar = await prisma.banco.findFirst({
      where: { nome_banco: parseBanco.data.nome_banco },
    });
    if (verificar) {
      throw new CustomError("Bank already exists", 400, [
        "Este Banco já existe",
      ]);
    }
    //criando um novo Banco
    const dados = await CreateBanco(parseBanco.data);

    return res.status(201).json({ massage: "Created Bank", dados });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

//Usuário Filtrar banco
export const FiltrarBancoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as propsal;

    // Verificar se a busca retorna resultados
    const banco = await FiltrarBanco(query);
    if (banco.length === 0) {
      throw new CustomError("Banco não encontrado", 400, [
        "O Banco não foi encontrado",
      ]);
    }

    return res.status(200).json(banco);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
//Actualizar o Banco

export const updateBancoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { nome_banco, codigo, sigla } = req.body;

  try {
    // Verificar se o banco existe
    const verificar = await prisma.banco.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!verificar) {
      throw new CustomError("Bank Not Found", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Validar os dados
    const verificarDado = BancoSchema.safeParse(req.body);

    if (!verificarDado.success) {
      // Filtrar especificamente o erro de nome_banco.nonempty
      const nomeBancoError = verificarDado.error.errors.find(
        (error) =>
          error.path.includes("nome_banco") &&
          error.message === "O nome não pode ser enviado vázio!"
      );

      if (nomeBancoError) {
        throw new CustomError("Erro de Validação", 400, [
          nomeBancoError.message,
        ]);
      } else {
        // Se não for o erro de nome_banco.nonempty, lançar todos os erros de validação
        throw new CustomError(
          "Erro de Validação",
          400,
          verificarDado.error.errors.map(
            (error) => `${error.path[0]}: ${error.message}`
          )
        );
      }
    }

    // Atualizar os dados
    const dados = await updateBanco({
      id: Number(id),
      nome_banco: verificarDado.data.nome_banco,
      codigo: verificarDado.data.codigo,
      sigla: verificarDado.data.sigla,
    });

    return res.json({
      Error: false,
      message: "Banco atualizado com sucesso",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
//Usuario Deletar Banco
export const deleteBancoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const banco = await prisma.banco.findFirst({ where: { id: Number(id) } });

    if (!banco) {
      throw new CustomError("Banco não encontrado!", 400, [
        "O Banco não foi encontrado!",
      ]);
    }

    // Fazer o delete do Banco
    const dados = await destroyBanco(Number(id));

    return res.json({
      Error: false,
      message: "Banco Deletado com sucesso!✔",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

//Usuário consultar Banco
export const getbyIdBancoController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const verificar = await prisma.banco.findFirst({
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
    const dados = await getbyIdBanco(Number(id));
    return res.status(200).json(dados);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
