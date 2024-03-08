/*
  Warnings:

  - You are about to drop the `Skils` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSkils` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pass` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectSkils" DROP CONSTRAINT "ProjectSkils_skilsId_fkey";

-- DropForeignKey
ALTER TABLE "UserSkils" DROP CONSTRAINT "UserSkils_skilsId_fkey";

-- DropForeignKey
ALTER TABLE "UserSkils" DROP CONSTRAINT "UserSkils_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pass" TEXT NOT NULL;

-- DropTable
DROP TABLE "Skils";

-- DropTable
DROP TABLE "UserSkils";

-- CreateTable
CREATE TABLE "Skills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSkills" (
    "userId" INTEGER NOT NULL,
    "skilsId" INTEGER NOT NULL,

    CONSTRAINT "UserSkills_pkey" PRIMARY KEY ("userId","skilsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skills_name_key" ON "Skills"("name");

-- AddForeignKey
ALTER TABLE "ProjectSkils" ADD CONSTRAINT "ProjectSkils_skilsId_fkey" FOREIGN KEY ("skilsId") REFERENCES "Skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkills" ADD CONSTRAINT "UserSkills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkills" ADD CONSTRAINT "UserSkills_skilsId_fkey" FOREIGN KEY ("skilsId") REFERENCES "Skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
