-- DropForeignKey
ALTER TABLE "ProjectSkils" DROP CONSTRAINT "ProjectSkils_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSkils" DROP CONSTRAINT "ProjectSkils_skilsId_fkey";

-- DropForeignKey
ALTER TABLE "UserSkills" DROP CONSTRAINT "UserSkills_skilsId_fkey";

-- DropForeignKey
ALTER TABLE "UserSkills" DROP CONSTRAINT "UserSkills_userId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectSkils" ADD CONSTRAINT "ProjectSkils_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSkils" ADD CONSTRAINT "ProjectSkils_skilsId_fkey" FOREIGN KEY ("skilsId") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkills" ADD CONSTRAINT "UserSkills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkills" ADD CONSTRAINT "UserSkills_skilsId_fkey" FOREIGN KEY ("skilsId") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
