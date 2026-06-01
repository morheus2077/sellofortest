/*
  Warnings:

  - Added the required column `exchange` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paidValue` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "exchange" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paidValue" DOUBLE PRECISION NOT NULL;
