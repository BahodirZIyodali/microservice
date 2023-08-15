/*
  Warnings:

  - Added the required column `sale` to the `goods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "goods" ADD COLUMN     "sale" VARCHAR(50) NOT NULL;
