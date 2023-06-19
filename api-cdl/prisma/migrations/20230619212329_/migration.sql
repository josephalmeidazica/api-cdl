-- CreateTable
CREATE TABLE "Semana" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dia" TEXT
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idEstabelecimento" INTEGER,
    "idSemana" INTEGER,
    "horario" TEXT,
    CONSTRAINT "Horario_idEstabelecimento_fkey" FOREIGN KEY ("idEstabelecimento") REFERENCES "Estabelecimento" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Horario_idSemana_fkey" FOREIGN KEY ("idSemana") REFERENCES "Semana" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
