/*
  Warnings:

  - You are about to alter the column `monthlySalary` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `maxSalary` on the `Position` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `minSalary` on the `Position` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."Employee" ALTER COLUMN "monthlySalary" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "public"."Position" ALTER COLUMN "maxSalary" SET DATA TYPE INTEGER,
ALTER COLUMN "minSalary" SET DATA TYPE INTEGER;
