/*
  Warnings:

  - Added the required column `monthlySalary` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Employee" ADD COLUMN     "monthlySalary" DECIMAL(65,30) NOT NULL;
