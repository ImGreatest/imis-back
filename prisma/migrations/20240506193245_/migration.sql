-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_baseTagId_fkey";

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_baseTagId_fkey" FOREIGN KEY ("baseTagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
