/*
  Warnings:

  - The primary key for the `Notifacation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[senderId,recipientId]` on the table `Notifacation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Notifacation" DROP CONSTRAINT "Notifacation_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Notifacation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "dogName" TEXT NOT NULL DEFAULT gen_random_uuid();

-- CreateTable
CREATE TABLE "Links" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "projectId" INTEGER,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notifacation_senderId_recipientId_key" ON "Notifacation"("senderId", "recipientId");

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
