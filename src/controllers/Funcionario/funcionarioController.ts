import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { UpdateFuncionario } from "../../models/Funcionario/UpdateFuncionario";
import { CreateFuncionario } from "../../models/Funcionario/createFuncionario";
import { destroyFuncionario } from "../../models/Funcionario/destroyFuncionario";
import { ListarFuncionarioById } from "../../models/Funcionario/getallbyId";
import { funcionarioSchema } from "../../utils/Validations/validateFuncionario";

export const createFuncionarioController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //verificar a validação
    const parseFuncionario = funcionarioSchema.safeParse(req.body);
    if (!parseFuncionario.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseFuncionario.error.errors.map((error) => error.message)
      );
    }
    //verificar se o funcionario já existe
    const verificar = await prisma.funcionario.findFirst({
      where: { nome_completo: parseFuncionario.data.nome_completo },
    });
    if (verificar) {
      throw new CustomError("This Funcionario already exists", 400, [
        "Este Funcionario já existe",
      ]);
    }
    //verificar se o email já existe
    const verficarEmail = await prisma.funcionario.findFirst({
      where: {
        email: parseFuncionario.data.email,
      },
    });
    if (verficarEmail) {
      throw new CustomError("This Email already exists", 400, [
        "Este Email já existe",
      ]);
    }
    //verificar número de telefone1
    const verficarTelefone1 = await prisma.funcionario.findFirst({
      where: {
        telefone1: parseFuncionario.data.telefone1,
      },
    });
    if (verficarTelefone1) {
      throw new CustomError("This number already exists", 400, [
        "Este Número de telefone já pertence a outro Funcionário!",
      ]);
    }
    //verificar número de telefone2
    const verficarTelefone2 = await prisma.funcionario.findFirst({
      where: {
        telefone2: parseFuncionario.data.telefone2,
      },
    });
    if (verficarTelefone2) {
      throw new CustomError("This number already exists", 400, [
        "Este Número de telefone já pertence a outro Funcionário!",
      ]);
    }
    //verificar o número de conta
    const verficarNum_Conta = await prisma.funcionario.findFirst({
      where: {
        num_conta: parseFuncionario.data.num_conta,
      },
    });
    if (verficarNum_Conta) {
      throw new CustomError("This count number already exists", 400, [
        "Este Número de Conta já pertence a outro Funcionário!",
      ]);
    }
    //verificar o Iban
    const verficarIban = await prisma.funcionario.findFirst({
      where: {
        iban: parseFuncionario.data.iban,
      },
    });
    if (verficarIban) {
      throw new CustomError("This iban number already exists", 400, [
        "Este Iban já pertence a outro Funcionário!",
      ]);
    }
    //verificar se a função existe
    const verificarFuncao = await prisma.funcao.findFirst({
      where: {
        id: parseFuncionario.data.id_funcao,
      },
    });
    if (!verificarFuncao) {
      throw new CustomError("Esta Função não existe!", 400, [
        "Esta Função não existe",
      ]);
    }
    //verificar se o banco existe
    const verificarBanco = await prisma.banco.findFirst({
      where: {
        id: parseFuncionario.data.Id_banco,
      },
    });
    if (!verificarBanco) {
      throw new CustomError("Este Banco não existe!", 400, [
        "Esta Banco não existe!",
      ]);
    }
    //verificar se a categoria existe
    const verificarCategoria = await prisma.categoriaRH.findFirst({
      where: {
        id: parseFuncionario.data.id_categoria,
      },
    });
    if (!verificarCategoria) {
      throw new CustomError("Esta Categria não existe!", 400, [
        "Esta Categoria não existe!",
      ]);
    }
    const dados = await CreateFuncionario(parseFuncionario.data);
    return res.status(201).json({ massage: "Created Funcionario!", dados });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};

//Atualizar Funcionario
export const updateFuncionarioController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    // Verificar se o funcionario existe
    const verificar = await prisma.funcionario.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!verificar) {
      throw new CustomError("Funcionario não encontrado!", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Validar os dados
    const verificarDado = funcionarioSchema.safeParse(req.body);

    if (!verificarDado.success) {
      // Filtrar especificamente o erro de nome_completo.nonempty
      const nomeCarreiraError = verificarDado.error.errors.find(
        (error) =>
          error.path.includes("nome_completo") &&
          error.message === "O nome não pode ser enviado vázio!"
      );

      if (nomeCarreiraError) {
        throw new CustomError("Erro de Validação", 400, [
          nomeCarreiraError.message,
        ]);
      } else {
        // Se não for o erro de nome_completo.nonempty, lançar todos os erros de validação
        throw new CustomError(
          "Erro de Validação",
          400,
          verificarDado.error.errors.map((error) => error.message)
        );
      }
    }

    // Atualizar os dados
    const dados = await UpdateFuncionario({
      id: Number(id),
      nome_completo: verificarDado.data.nome_completo,
      bairro: verificarDado.data.bairro,
      id_categoria: verificarDado.data.id_categoria,
      email: verificarDado.data.email,
      genero: verificarDado.data.genero,
      Id_banco: verificarDado.data.Id_banco,
      nascimento: verificarDado.data.nascimento,
      iban: verificarDado.data.iban,
      id_funcao: verificarDado.data.id_funcao,
      nivel_academico: verificarDado.data.nivel_academico,
      nome_mae: verificarDado.data.nome_mae,
      nome_pai: verificarDado.data.nome_pai,
      num_identificacao: verificarDado.data.num_identificacao,
      rua: verificarDado.data.rua,
      telefone1: verificarDado.data.telefone1,
      tipo_identificacao: verificarDado.data.tipo_identificacao,
      avatar: verificarDado.data.avatar,
      instagram: verificarDado.data.instagram,
      linkedin: verificarDado.data.linkedin,
      num_conta: verificarDado.data.num_conta,
      telefone2: verificarDado.data.telefone2,
      whatsApp: verificarDado.data.whatsApp,
    });

    return res.json({
      Error: false,
      message: "Funcionário atualizado com sucesso",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
  }
};
//Consultar Funcionario pelo Id
export const getbyIdFuncionarioController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const funcao = await prisma.funcionario.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!funcao) {
      throw new CustomError("Funcionário não encontrado", 400, [
        "Funcionario não encontrado!",
      ]);
    }
    const carreira = await ListarFuncionarioById(Number(id));
    return res.status(200).json(carreira);
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros;
  }
};

//Deletar um funcionário
export const deleteFuncionario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const funcionario = await prisma.funcionario.findFirst({
      where: { id: Number(id) },
    });

    if (!funcionario) {
      throw new CustomError("Funcionário não encontrado", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Fazer o delete de um Funcionario
    const dados = await destroyFuncionario(Number(id));

    return res.json({
      Error: false,
      message: "Funcionário Deletado com sucesso",
      dados,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err });
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};
