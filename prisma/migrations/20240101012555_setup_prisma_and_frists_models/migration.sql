-- CreateTable
CREATE TABLE "User" (
    "id" BIGINT NOT NULL,
    "commandsCounter" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" BIGINT NOT NULL,
    "commandsCounter" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);
