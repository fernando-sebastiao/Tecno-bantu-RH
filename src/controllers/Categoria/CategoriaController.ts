import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/db";
import { CustomError } from "../../errors/CustomError";
import { CreateCategoria } from "../../models/Categoria/createCategoria";
import { destroyCategoria } from "../../models/Categoria/destroy";
import { ListarCategoriaById } from "../../models/Categoria/getallbyId";
import { updateCategoria } from "../../models/Categoria/updateCategoria";
import { categoriaSchema } from "../../utils/validateCategoria";

export const createCategoriaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //verificar a validação
    const parseCarreira = categoriaSchema.safeParse(req.body);
    if (!parseCarreira.success) {
      throw new CustomError(
        "Erro de Validação",
        400,
        parseCarreira.error.errors.map((error) => error.message)
      );
    }
    //verificar se a carreira existe
    const ifcarreiraExiste = await prisma.carreira.findUnique({
      where: { id: parseCarreira.data.Id_carreira },
    });
    if (!ifcarreiraExiste) {
      throw new CustomError("Esta carreira não existe!", 400, [
        "Esta carreira não existe, tente novamente!",
      ]);
    }
    //verificar se a subcarreira existe
    const ifsubCarreiraExiste = await prisma.subCarreira.findUnique({
      where: {
        id: parseCarreira.data.Id_subCarreira,
      },
    });
    if (!ifsubCarreiraExiste) {
      throw new CustomError("Esta Subcarreira não existe!", 400, [
        "Esta Subcarreira não existe, tente novamente!",
      ]);
    }
    //verificar se a categoria já existe
    const verificar = await prisma.categoriaRH.findFirst({
      where: { nome_categoria: parseCarreira.data.nome_categoria },
    });
    if (verificar) {
      throw new CustomError("This Carreira already exists", 400, [
        "Esta Carreira já existe",
      ]);
    }
    const dados = await CreateCategoria({
      nome_categoria: parseCarreira.data.nome_categoria,
      salario_base: parseCarreira.data.salario_base,
      Id_carreira: parseCarreira.data.Id_carreira,
      Id_subCarreira: parseCarreira.data.Id_subCarreira,
    });
    return res.status(201).json({ massage: "Created Categoria", dados });
  } catch (err) {
    next(err);
  }
};
export const getbyIdCategoria = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    //verificar se existe
    const funcao = await prisma.categoriaRH.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!funcao) {
      throw new CustomError("Categoria não encontrado", 400, [
        "A Categoria não encontrado",
      ]);
    }
    const categoria = await ListarCategoriaById(Number(id));
    return res.status(200).json(categoria);
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros;
  }
};

//Actualizar o Banco

export const updateCategoriaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { nome_categoria, salario_base, Id_carreira, Id_subCarreira } =
    req.body;

  try {
    // Verificar se o banco existe
    const verificar = await prisma.categoriaRH.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!verificar) {
      throw new CustomError("Categoria Not Found", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Validar os dados
    const verificarDado = categoriaSchema.safeParse(req.body);

    if (!verificarDado.success) {
      // Filtrar especificamente o erro de nome_categoria.nonempty
      const nomeBancoError = verificarDado.error.errors.find(
        (error) =>
          error.path.includes("nome_categoria") &&
          error.message === "O nome não pode ser enviado vázio!"
      );

      if (nomeBancoError) {
        throw new CustomError("Erro de Validação", 400, [
          nomeBancoError.message,
        ]);
      } else {
        // Se não for o erro de nome_categoria.nonempty, lançar todos os erros de validação
        throw new CustomError(
          "Erro de Validação",
          400,
          verificarDado.error.errors.map((error) => error.message)
        );
      }
    }

    // Atualizar os dados
    const dados = await updateCategoria({
      id: Number(id),
      nome_categoria: verificarDado.data.nome_categoria,
      salario_base: verificarDado.data.salario_base,
      Id_carreira: verificarDado.data.Id_carreira,
      Id_subCarreira: verificarDado.data.Id_subCarreira,
    });

    return res.json({
      Error: false,
      message: " atualizado com sucesso",
      dados,
    });
  } catch (err) {
    next(err);
  }
};

//Usuario Deletar Categoria
export const deleteCategoria = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const categoria = await prisma.categoriaRH.findFirst({
      where: { id: Number(id) },
    });

    if (!categoria) {
      throw new CustomError("Categoria não encontrada", 400, [
        "O número de identificação fornecido não existe",
      ]);
    }

    // Fazer o delete da Categoria
    const dados = await destroyCategoria(Number(id));

    return res.json({
      Error: false,
      message: "Categoria Deletada com sucesso",
      dados,
    });
  } catch (err) {
    next(err); // Passa o erro para o middleware de tratamento de erros
  }
};
