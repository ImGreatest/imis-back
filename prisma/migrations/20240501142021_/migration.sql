-- DropForeignKey
ALTER TABLE "Skills" DROP CONSTRAINT "Skills_skillTypeId_fkey";

-- DropIndex
DROP INDEX "Success_name_key";

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_skillTypeId_fkey" FOREIGN KEY ("skillTypeId") REFERENCES "SkillType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
