import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { main } from "../../prisma/seed";

const prisma = new PrismaClient();

const checkDatabase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const carreirasCount = await prisma.carreira.count();
  const subCarreirasCount = await prisma.subCarreira.count();
  const categoriasCount = await prisma.categoriaRH.count();

  if (
    carreirasCount === 0 ||
    subCarreirasCount === 0 ||
    categoriasCount === 0
  ) {
    await main(); // Chama a função main do seed script para inserir os dados
  } else {
    console.log("O banco de dados já contém dados!");
    next();
  }
  next();
};

export default checkDatabase;

//Alterado alguma coisa
