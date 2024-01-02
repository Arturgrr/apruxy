-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastDaily" TIMESTAMP(3) NOT NULL DEFAULT now() - interval '24 hours';
