import { PrismaClient, Regime } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  const carreiras = [
    { id: 1, nome_carreira: "TÉCNICA SUPERIOR", regime: "geral" },
    { id: 2, nome_carreira: "TÉCNICA", regime: "geral" },
    { id: 3, nome_carreira: "TÉCNICA MÉDIA", regime: "geral" },
    { id: 4, nome_carreira: "AUXILIARES", regime: "geral" },
    { id: 5, nome_carreira: "ADMINISTRATIVOS", regime: "geral" },
    { id: 6, nome_carreira: "OPERARIO", regime: "geral" },
    { id: 7, nome_carreira: "DOCENTE", regime: "especial" },
    { id: 8, nome_carreira: "INVESTIGAÇÃO CIENTIFICA", regime: "especial" },
  ];

  for (const carreira of carreiras) {
    await prisma.carreira.upsert({
      where: { id: carreira.id },
      update: {
        nome_carreira: carreira.nome_carreira,
        regime: carreira.regime as Regime,
        updatedAt: new Date(),
      },
      create: {
        id: carreira.id,
        nome_carreira: carreira.nome_carreira,
        regime: carreira.regime as Regime,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  const subCarreiras = [
    { id: 1, id_carreira: 4, nome_sub_carreira: "TELEFONISTA" },
    { id: 2, id_carreira: 4, nome_sub_carreira: "AUXILIAR ADMINISTRATIVO" },
    { id: 3, id_carreira: 4, nome_sub_carreira: "AUXILIAR DE LIMPEZA" },
    { id: 4, id_carreira: 5, nome_sub_carreira: "TESOUREIRO" },
    { id: 5, id_carreira: 5, nome_sub_carreira: "MOTORISTA DE PESADOS" },
    { id: 6, id_carreira: 5, nome_sub_carreira: "MOTORISTA DE LIGEIROS" },
    { id: 7, id_carreira: 6, nome_sub_carreira: "QUALIFICADO" },
    { id: 8, id_carreira: 6, nome_sub_carreira: "NÃO QUALIFICADO" },
  ];

  for (const subCarreira of subCarreiras) {
    await prisma.subCarreira.upsert({
      where: { id: subCarreira.id },
      update: {
        nome_SubCarreira: subCarreira.nome_sub_carreira,
        Id_carreira: subCarreira.id_carreira,
        updatedAt: new Date(),
      },
      create: {
        id: subCarreira.id,
        nome_SubCarreira: subCarreira.nome_sub_carreira,
        Id_carreira: subCarreira.id_carreira,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  const categorias = [
    {
      id: 1,
      nome_categoria: "TÉCNICO SUPERIOR 2ª CLASSE",
      salario_base: 0,
      Id_carreira: 1,
      Id_subCarreira: null,
    },
    {
      id: 2,
      nome_categoria: "TÉCNICO SUPERIOR 1ª CLASSE",
      salario_base: 0,
      Id_carreira: 1,
      Id_subCarreira: null,
    },
    {
      id: 3,
      nome_categoria: "TÉCNICO SUPERIOR PRINCIPAL",
      salario_base: 0,
      Id_carreira: 1,
      Id_subCarreira: null,
    },
    {
      id: 4,
      nome_categoria: "ACESSOR",
      salario_base: 0,
      Id_carreira: 1,
      Id_subCarreira: null,
    },
    {
      id: 5,
      nome_categoria: "1º ACESSOR",
      salario_base: 0,
      Id_carreira: 1,
      Id_subCarreira: null,
    },
    {
      id: 6,
      nome_categoria: "ACESSOR PRINCIPAL",
      salario_base: 0,
      Id_carreira: 1,
      Id_subCarreira: null,
    },
    {
      id: 7,
      nome_categoria: "TÉCNIC DE 3ª CLASSE",
      salario_base: 0,
      Id_carreira: 2,
      Id_subCarreira: null,
    },
    {
      id: 8,
      nome_categoria: "TÉCNIC DE 2ª CLASSE",
      salario_base: 0,
      Id_carreira: 2,
      Id_subCarreira: null,
    },
    {
      id: 9,
      nome_categoria: "TÉCNIC DE 1ª CLASSE",
      salario_base: 0,
      Id_carreira: 2,
      Id_subCarreira: null,
    },
    {
      id: 10,
      nome_categoria: "TÉCNIC ESPECIALISTA DE 2ª CLASSE",
      salario_base: 0,
      Id_carreira: 2,
      Id_subCarreira: null,
    },
    {
      id: 11,
      nome_categoria: "TÉCNIC ESPECIALISTA DE 1ª CLASSE",
      salario_base: 0,
      Id_carreira: 2,
      Id_subCarreira: null,
    },
    {
      id: 12,
      nome_categoria: "TÉCNIC ESPECIALISTA PRINCIPAL",
      salario_base: 0,
      Id_carreira: 2,
      Id_subCarreira: null,
    },
    {
      id: 13,
      nome_categoria: "TÉCNICO MÉDIO DE 3ª CLASSE",
      salario_base: 0,
      Id_carreira: 3,
      Id_subCarreira: null,
    },
    {
      id: 14,
      nome_categoria: "TÉCNICO MÉDIO DE 2ª CLASSE",
      salario_base: 0,
      Id_carreira: 3,
      Id_subCarreira: null,
    },
    {
      id: 15,
      nome_categoria: "TÉCNICO MÉDIO DE 1ª CLASSE",
      salario_base: 0,
      Id_carreira: 3,
      Id_subCarreira: null,
    },
    {
      id: 16,
      nome_categoria: "TÉCNICO MÉDIO PRINCIPAL DE 3ª CLASSE",
      salario_base: 0,
      Id_carreira: 3,
      Id_subCarreira: null,
    },
    {
      id: 17,
      nome_categoria: "TÉCNICO MÉDIO PRINCIPAL DE 2ª CLASSE",
      salario_base: 0,
      Id_carreira: 3,
      Id_subCarreira: null,
    },
    {
      id: 18,
      nome_categoria: "TÉCNICO MÉDIO PRINCIPAL DE 1ª CLASSE",
      salario_base: 0,
      Id_carreira: 3,
      Id_subCarreira: null,
    },
    {
      id: 19,
      nome_categoria: "TELEFONISTA DE 2ª CLASSE",
      salario_base: 0,
      Id_carreira: 4,
      Id_subCarreira: 1,
    },
    {
      id: 20,
      nome_categoria: "TELEFONISTA DE 1ª CLASSE",
      salario_base: 0,
      Id_carreira: 4,
      Id_subCarreira: 1,
    },
    {
      id: 21,
      nome_categoria: "AUXILIAR ADMINISTRATIVO DE 2ª CLASSE",
      salario_base: 0,
      Id_carreira: 4,
      Id_subCarreira: 2,
    },
    {
      id: 22,
      nome_categoria: "AUXILIAR ADMINISTRATIVO DE 1ª CLASSE",
      salario_base: 0,
      Id_carreira: 4,
      Id_subCarreira: 2,
    },
    {
      id: 23,
      nome_categoria: "AUXILIAR ADMINISTRATIVO PRINCIPAL",
      salario_base: 0,
      Id_carreira: 4,
      Id_subCarreira: 2,
    },
    {
      id: 24,
      nome_categoria: "AUXILIAR DE LIMPEZA DE 2ª CLASSE",
      salario_base: 0,
      Id_carreira: 4,
      Id_subCarreira: 3,
    },
    {
      id: 25,
      nome_categoria: "AUXILIAR DE LIMPEZA DE 1ª CLASSE",
      salario_base: 0,
      Id_carreira: 4,
      Id_subCarreira: 3,
    },
    {
      id: 26,
      nome_categoria: "AUXILIAR DE LIMPEZA DE PRINCIPAL",
      salario_base: 0,
      Id_carreira: 4,
      Id_subCarreira: 3,
    },
    {
      id: 27,
      nome_categoria: "ESCRITURÁRIO DATILIGRAFO",
      salario_base: 0,
      Id_carreira: 5,
      Id_subCarreira: null,
    },
    {
      id: 28,
      nome_categoria: "ASPIRANTE",
      salario_base: 0,
      Id_carreira: 5,
      Id_subCarreira: null,
    },
    {
      id: 29,
      nome_categoria: "3º OFICIAL",
      salario_base: 0,
      Id_carreira: 5,
      Id_subCarreira: null,
    },
    {
      id: 30,
      nome_categoria: "2º OFICIAL",
      salario_base: 0,
      Id_carreira: 5,
      Id_subCarreira: null,
    },
    {
      id: 31,
      nome_categoria: "1º OFICIAL",
      salario_base: 0,
      Id_carreira: 5,
      Id_subCarreira: null,
    },
    {
      id: 32,
      nome_categoria: "OFICIAL ADMINISTRATIVO PRINCIPAL",
      salario_base: 0,
      Id_carreira: 5,
      Id_subCarreira: null,
    },
    {
      id: 33,
      nome_categoria: "TESOUREIRO DE 2ª CLASSE",
      salario_base: 0,
      Id_carreira: 5,
      Id_subCarreira: 4,
    },
    {
      id: 34,
      nome_categoria: "TESOUREIRO DE 1ª CLASSE",
      salario_base: 0,
      Id_carreira: 5,
      Id_subCarreira: 4,
    },
    {
      id: 35,
      nome_categoria: "TESOUREIRO PRINCIPAL",
      salario_base: 0,
      Id_carreira: 5,
      Id_subCarreira: 4,
    },
    {
      id: 36,
      nome_categoria: "MOTORISTA DE PESADOS DE 2ª CLASSE",
      salario_base: 0,
      Id_carreira: 5,
      Id_subCarreira: 5,
    },
    {
      id: 37,
      nome_categoria: "MOTORISTA DE PESADOS DE 1ª CLASSE",
      salario_base: 0,
      Id_carreira: 5,
      Id_subCarreira: 5,
    },
    {
      id: 38,
      nome_categoria: "MOTORISTA DE PESADOS PRINCIPAL",
      salario_base: 0,
      Id_carreira: 5,
      Id_subCarreira: 5,
    },
    {
      id: 39,
      nome_categoria: "MOTORISTA DE LIGEIROS DE 2ª CLASSE",
      salario_base: 0,
      Id_carreira: 5,
      Id_subCarreira: 6,
    },
    {
      id: 40,
      nome_categoria: "MOTORISTA DE LIGEIROS DE 1ª CLASSE",
      salario_base: 0,
      Id_carreira: 5,
      Id_subCarreira: 6,
    },
    {
      id: 41,
      nome_categoria: "MOTORISTA DE LIGEIROS PRINCIPAL",
      salario_base: 0,
      Id_carreira: 5,
      Id_subCarreira: 6,
    },
    {
      id: 42,
      nome_categoria: "OPERARIO QUALIFICADO DE 2ª CLASSE",
      salario_base: 0,
      Id_carreira: 6,
      Id_subCarreira: 7,
    },
    {
      id: 43,
      nome_categoria: "OPERARIO QUALIFICADO DE 1ª CLASSE",
      salario_base: 0,
      Id_carreira: 6,
      Id_subCarreira: 7,
    },
    {
      id: 44,
      nome_categoria: "OPERARIO ENCARREGADO QUALIFICADO",
      salario_base: 0,
      Id_carreira: 6,
      Id_subCarreira: 7,
    },
    {
      id: 45,
      nome_categoria: "OPERARIO NÃO QUALIFICADO DE 2ª CLASSE",
      salario_base: 0,
      Id_carreira: 6,
      Id_subCarreira: 8,
    },
    {
      id: 46,
      nome_categoria: "OPERARIO NÃO QUALIFICADO DE 1ª CLASSE",
      salario_base: 0,
      Id_carreira: 6,
      Id_subCarreira: 8,
    },
    {
      id: 47,
      nome_categoria: "OPERARIO ENCARREGADO NÃO QUALIFICADO",
      salario_base: 0,
      Id_carreira: 6,
      Id_subCarreira: 8,
    },
    {
      id: 48,
      nome_categoria: "PROFESSOR CATEDRÁTICO",
      salario_base: 0,
      Id_carreira: 7,
      Id_subCarreira: null,
    },
    {
      id: 49,
      nome_categoria: "PROFESSOR ASSOCIADO",
      salario_base: 0,
      Id_carreira: 7,
      Id_subCarreira: null,
    },
    {
      id: 50,
      nome_categoria: "PROFESSOR AUXILIAR",
      salario_base: 0,
      Id_carreira: 7,
      Id_subCarreira: null,
    },
    {
      id: 51,
      nome_categoria: "ASSISTENTE",
      salario_base: 0,
      Id_carreira: 7,
      Id_subCarreira: null,
    },
    {
      id: 52,
      nome_categoria: "ASSISTENTE ESTAGIÁRIO",
      salario_base: 0,
      Id_carreira: 7,
      Id_subCarreira: null,
    },
    {
      id: 53,
      nome_categoria: "MONITOR",
      salario_base: 0,
      Id_carreira: 7,
      Id_subCarreira: null,
    },
    {
      id: 54,
      nome_categoria: "LEITOR",
      salario_base: 0,
      Id_carreira: 7,
      Id_subCarreira: null,
    },
    {
      id: 55,
      nome_categoria: "INVESTIGADOR COORDENADOR",
      salario_base: 0,
      Id_carreira: 8,
      Id_subCarreira: null,
    },
    {
      id: 56,
      nome_categoria: "INVESTIGADOR PRINCIPAL",
      salario_base: 0,
      Id_carreira: 8,
      Id_subCarreira: null,
    },
    {
      id: 57,
      nome_categoria: "INVESTIGADOR AUXILIAR",
      salario_base: 0,
      Id_carreira: 8,
      Id_subCarreira: null,
    },
    {
      id: 58,
      nome_categoria: "ASSISTENTE DE INVESTIGAÇÃO",
      salario_base: 0,
      Id_carreira: 8,
      Id_subCarreira: null,
    },
    {
      id: 59,
      nome_categoria: "ESTAGIÁRIO DE INVESTIGAÇÃO",
      salario_base: 0,
      Id_carreira: 8,
      Id_subCarreira: null,
    },
  ];

  for (const categoria of categorias) {
    await prisma.categoriaRH.upsert({
      where: { id: categoria.id },
      update: {
        nome_categoria: categoria.nome_categoria,
        salario_base: categoria.salario_base,
        Id_carreira: categoria.Id_carreira,
        Id_subCarreira: categoria.Id_subCarreira,
        updatedAt: new Date(),
      },
      create: {
        id: categoria.id,
        nome_categoria: categoria.nome_categoria,
        salario_base: categoria.salario_base,
        Id_carreira: categoria.Id_carreira,
        Id_subCarreira: categoria.Id_subCarreira,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  console.log("Dados Actualizados!✔");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
//Função encarregue de armazenar os dados automaticamente
