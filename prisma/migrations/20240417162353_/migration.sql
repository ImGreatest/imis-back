/*
  Warnings:

  - Added the required column `skillTypeId` to the `Skills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skills" ADD COLUMN     "skillTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SkillType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "SkillType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SkillType_name_key" ON "SkillType"("name");

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_skillTypeId_fkey" FOREIGN KEY ("skillTypeId") REFERENCES "SkillType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
