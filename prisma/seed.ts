import { PrismaClient, Regime } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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
        regime: carreira.regime as Regime, // Convertendo string para enum
        updatedAt: new Date(),
      },
      create: {
        id: carreira.id,
        nome_carreira: carreira.nome_carreira,
        regime: carreira.regime as Regime, // Convertendo string para enum
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
