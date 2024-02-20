/*
  Warnings:

  - Added the required column `userId` to the `Success` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Success" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Success" ADD CONSTRAINT "Success_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
