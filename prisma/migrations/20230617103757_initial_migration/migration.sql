-- CreateTable
CREATE TABLE "Tipo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT
);

-- CreateTable
CREATE TABLE "Ponto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idTipo" INTEGER,
    CONSTRAINT "Ponto_idTipo_fkey" FOREIGN KEY ("idTipo") REFERENCES "Tipo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Localizacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idPonto" INTEGER,
    "cep" TEXT,
    "rua" TEXT,
    "bairro" TEXT,
    "numero" TEXT,
    CONSTRAINT "Localizacao_idPonto_fkey" FOREIGN KEY ("idPonto") REFERENCES "Ponto" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Estabelecimento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idTipo" INTEGER,
    "idLocalizacao" INTEGER,
    "nome" TEXT,
    "descricao" TEXT,
    "nota" TEXT,
    CONSTRAINT "Estabelecimento_idTipo_fkey" FOREIGN KEY ("idTipo") REFERENCES "Tipo" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Estabelecimento_idLocalizacao_fkey" FOREIGN KEY ("idLocalizacao") REFERENCES "Localizacao" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
