/*
  Warnings:

  - You are about to drop the column `userId` on the `Success` table. All the data in the column will be lost.
  - Added the required column `status` to the `Notifacation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createrId` to the `Success` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Success` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotifacationStatus" AS ENUM ('read', 'unread');

-- DropForeignKey
ALTER TABLE "Success" DROP CONSTRAINT "Success_userId_fkey";

-- AlterTable
ALTER TABLE "Notifacation" ADD COLUMN     "status" "NotifacationStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Success" DROP COLUMN "userId",
ADD COLUMN     "createrId" INTEGER NOT NULL,
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Success" ADD CONSTRAINT "Success_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Success" ADD CONSTRAINT "Success_createrId_fkey" FOREIGN KEY ("createrId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
