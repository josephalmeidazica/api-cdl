-- CreateTable
CREATE TABLE "Tipo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,

    CONSTRAINT "Tipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Onibus" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,

    CONSTRAINT "Onibus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Localizacao" (
    "id" SERIAL NOT NULL,
    "cep" TEXT,
    "rua" TEXT,
    "bairro" TEXT,
    "numero" TEXT,

    CONSTRAINT "Localizacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnibusOnLocalizacao" (
    "onibusId" INTEGER NOT NULL,
    "localizacaoId" INTEGER NOT NULL,

    CONSTRAINT "OnibusOnLocalizacao_pkey" PRIMARY KEY ("onibusId","localizacaoId")
);

-- CreateTable
CREATE TABLE "Estabelecimento" (
    "id" SERIAL NOT NULL,
    "idTipo" INTEGER,
    "idLocalizacao" INTEGER,
    "nome" TEXT,
    "descricao" TEXT,
    "nota" TEXT,

    CONSTRAINT "Estabelecimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" SERIAL NOT NULL,
    "idEstabelecimento" INTEGER,
    "dia" TEXT,
    "horario" TEXT,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OnibusOnLocalizacao" ADD CONSTRAINT "OnibusOnLocalizacao_onibusId_fkey" FOREIGN KEY ("onibusId") REFERENCES "Onibus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnibusOnLocalizacao" ADD CONSTRAINT "OnibusOnLocalizacao_localizacaoId_fkey" FOREIGN KEY ("localizacaoId") REFERENCES "Localizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estabelecimento" ADD CONSTRAINT "Estabelecimento_idTipo_fkey" FOREIGN KEY ("idTipo") REFERENCES "Tipo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estabelecimento" ADD CONSTRAINT "Estabelecimento_idLocalizacao_fkey" FOREIGN KEY ("idLocalizacao") REFERENCES "Localizacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_idEstabelecimento_fkey" FOREIGN KEY ("idEstabelecimento") REFERENCES "Estabelecimento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

