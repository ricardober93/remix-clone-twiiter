/*
  Warnings:

  - You are about to drop the column `descrptionUser` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "descrptionUser",
ADD COLUMN     "descriptionUser" TEXT;
