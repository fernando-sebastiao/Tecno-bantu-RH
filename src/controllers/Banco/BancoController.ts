import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { updateBanco } from "../../models/Banco/UpdateBanco";
import { CreateBanco } from "../../models/Banco/createBanco";
import { destroyBanco } from "../../models/Banco/destroy";
import { ListarBancoById } from "../../models/Banco/getAllbyId";
import { BancoSchema } from "../../utils/validateBanco";

//Usuário criar funcao
export const createBanco = async (
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
        parseBanco.error.errors.map((error) => error.message)
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
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};

//Usuário Consultar banco
export const getbyIdBanco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const funcao = await prisma.banco.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!funcao) {
      throw new CustomError("Banco não encontrado", 400, [
        "O Banco não encontrado",
      ]);
    }
    const banco = await ListarBancoById(Number(id));
    return res.status(200).json(banco);
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros;
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
          verificarDado.error.errors.map((error) => error.message)
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
    next(err);
  }
};
//Usuario Deletar Função
export const deleteBanco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const banco = await prisma.banco.findFirst({ where: { id: Number(id) } });

    if (!banco) {
      throw new CustomError("Usuário não encontrado", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Fazer o delete do Banco
    const dados = await destroyBanco(Number(id));

    return res.json({
      Error: false,
      message: "Banco Deletado com sucesso",
      dados,
    });
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};
