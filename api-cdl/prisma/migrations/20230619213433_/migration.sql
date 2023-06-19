/*
  Warnings:

  - You are about to drop the `Ponto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `idPonto` on the `Localizacao` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Ponto";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Onibus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT
);

-- CreateTable
CREATE TABLE "OnibusOnLocalizacao" (
    "onibusId" INTEGER NOT NULL,
    "localizacaoId" INTEGER NOT NULL,

    PRIMARY KEY ("onibusId", "localizacaoId"),
    CONSTRAINT "OnibusOnLocalizacao_onibusId_fkey" FOREIGN KEY ("onibusId") REFERENCES "Onibus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OnibusOnLocalizacao_localizacaoId_fkey" FOREIGN KEY ("localizacaoId") REFERENCES "Localizacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Localizacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cep" TEXT,
    "rua" TEXT,
    "bairro" TEXT,
    "numero" TEXT
);
INSERT INTO "new_Localizacao" ("bairro", "cep", "id", "numero", "rua") SELECT "bairro", "cep", "id", "numero", "rua" FROM "Localizacao";
DROP TABLE "Localizacao";
ALTER TABLE "new_Localizacao" RENAME TO "Localizacao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
