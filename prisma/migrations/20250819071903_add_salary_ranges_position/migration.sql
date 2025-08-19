/*
  Warnings:

  - Added the required column `maxSalary` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minSalary` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Position" ADD COLUMN     "maxSalary" INTEGER NOT NULL,
ADD COLUMN     "minSalary" INTEGER NOT NULL;
