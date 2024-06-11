-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('livro', 'cientifico', 'outro');

-- CreateEnum
CREATE TYPE "Contrato" AS ENUM ('CTD', 'CAP');

-- CreateEnum
CREATE TYPE "NIVEL_ACADEMICO" AS ENUM ('Base', 'Medio', 'Universitario', 'Licenciado', 'Mestrado', 'Doctoramento');

-- CreateEnum
CREATE TYPE "Identificacao" AS ENUM ('BI', 'Passaporte', 'Residente', 'Outro');

-- CreateEnum
CREATE TYPE "Regime" AS ENUM ('geral', 'especial');

-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('masculino', 'femenino');

-- CreateTable
CREATE TABLE "carreira" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "regime" "Regime" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carreira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subcarreira" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "carreiraId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subcarreira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "salario_base" DOUBLE PRECISION[],
    "carreiraId" INTEGER,
    "subCarreiraId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funcao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funcao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banco" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funcionario" (
    "id" SERIAL NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "nomePai" TEXT NOT NULL,
    "nomeMae" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "genero" "Genero" NOT NULL,
    "pais" TEXT NOT NULL,
    "tipo_identificacao" "Identificacao" NOT NULL,
    "num_identificacao" TEXT NOT NULL,
    "nivel_academico" "NIVEL_ACADEMICO" NOT NULL,
    "avatar" TEXT,
    "telefone1" TEXT NOT NULL,
    "telefone2" TEXT,
    "linkedin" TEXT,
    "whatsApp" TEXT,
    "instagram" TEXT,
    "bairro" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "funcaoId" INTEGER,
    "categoriaId" INTEGER,
    "numeroConta" TEXT,
    "iban" TEXT,
    "bancoId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DadosProfissionais" (
    "id" SERIAL NOT NULL,
    "data_admissao" TIMESTAMP(3) NOT NULL,
    "numeroDespacho" TEXT,
    "data_despacho" TIMESTAMP(3) NOT NULL,
    "contrato" "Contrato" NOT NULL,
    "funcionarioId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DadosProfissionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formacoes" (
    "id" SERIAL NOT NULL,
    "ano_inicio" TIMESTAMP(3) NOT NULL,
    "ano_termino" TIMESTAMP(3) NOT NULL,
    "formacao" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "funcionarioId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "formacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publicacoes" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "entidade" TEXT NOT NULL,
    "ano" TIMESTAMP(3) NOT NULL,
    "tipo" "Tipo" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "publicacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperiencialLaboral" (
    "id" SERIAL NOT NULL,
    "ano_inicio" TIMESTAMP(3) NOT NULL,
    "ano_termino" TIMESTAMP(3) NOT NULL,
    "funcao" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "pais" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "funcionarioId" INTEGER,

    CONSTRAINT "ExperiencialLaboral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "Id_funcionario_chefe" INTEGER,
    "Id_funcionario_supervisor" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FuncionarioDepartamento" (
    "id" SERIAL NOT NULL,
    "departamentoId" INTEGER,
    "funcionarioId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FuncionarioDepartamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "carreira_nome_key" ON "carreira"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_email_key" ON "funcionario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_telefone1_key" ON "funcionario"("telefone1");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_telefone2_key" ON "funcionario"("telefone2");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_numeroConta_key" ON "funcionario"("numeroConta");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_iban_key" ON "funcionario"("iban");

-- AddForeignKey
ALTER TABLE "subcarreira" ADD CONSTRAINT "subcarreira_carreiraId_fkey" FOREIGN KEY ("carreiraId") REFERENCES "carreira"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoria" ADD CONSTRAINT "categoria_carreiraId_fkey" FOREIGN KEY ("carreiraId") REFERENCES "carreira"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoria" ADD CONSTRAINT "categoria_subCarreiraId_fkey" FOREIGN KEY ("subCarreiraId") REFERENCES "subcarreira"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funcionario" ADD CONSTRAINT "funcionario_funcaoId_fkey" FOREIGN KEY ("funcaoId") REFERENCES "funcao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funcionario" ADD CONSTRAINT "funcionario_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funcionario" ADD CONSTRAINT "funcionario_bancoId_fkey" FOREIGN KEY ("bancoId") REFERENCES "banco"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosProfissionais" ADD CONSTRAINT "DadosProfissionais_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formacoes" ADD CONSTRAINT "formacoes_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperiencialLaboral" ADD CONSTRAINT "ExperiencialLaboral_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departamento" ADD CONSTRAINT "Departamento_Id_funcionario_chefe_fkey" FOREIGN KEY ("Id_funcionario_chefe") REFERENCES "funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departamento" ADD CONSTRAINT "Departamento_Id_funcionario_supervisor_fkey" FOREIGN KEY ("Id_funcionario_supervisor") REFERENCES "funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuncionarioDepartamento" ADD CONSTRAINT "FuncionarioDepartamento_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuncionarioDepartamento" ADD CONSTRAINT "FuncionarioDepartamento_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
