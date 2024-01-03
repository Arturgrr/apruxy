-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "commandsCounter" INTEGER NOT NULL DEFAULT 0,
    "vip" TEXT NOT NULL DEFAULT 'false',
    "money" INTEGER NOT NULL DEFAULT 0,
    "lastDaily" TIMESTAMP(3) NOT NULL DEFAULT now() - interval '24 hours',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "commandsCounter" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);
