/*
  Warnings:

  - You are about to drop the column `createdAt` on the `SkillType` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `SkillType` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `SkillType` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Skills` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Skills` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Skills` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SkillType" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Skills" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";
