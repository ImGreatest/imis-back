/*
  Warnings:

  - You are about to drop the column `name` on the `Links` table. All the data in the column will be lost.
  - You are about to drop the `UserFavoritProject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adress` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkType` to the `Links` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('phone', 'social', 'mail', 'url');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('planned', 'confirmed', 'canceled', 'completed', 'rescheduled');

-- DropForeignKey
ALTER TABLE "UserFavoritProject" DROP CONSTRAINT "UserFavoritProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoritProject" DROP CONSTRAINT "UserFavoritProject_userId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "adress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Links" DROP COLUMN "name",
ADD COLUMN     "companyId" INTEGER,
ADD COLUMN     "eventId" INTEGER,
ADD COLUMN     "linkType" "LinkType" NOT NULL;

-- DropTable
DROP TABLE "UserFavoritProject";

-- CreateTable
CREATE TABLE "UserFavoriteProject" (
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "UserFavoriteProject_pkey" PRIMARY KEY ("userId","projectId")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "status" "EventStatus" NOT NULL,
    "createrId" INTEGER NOT NULL,
    "confidentPersonId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestEvent" (
    "guestId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "GuestEvent_pkey" PRIMARY KEY ("guestId","eventId")
);

-- CreateTable
CREATE TABLE "FavoriteEvent" (
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "FavoriteEvent_pkey" PRIMARY KEY ("userId","eventId")
);

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteProject" ADD CONSTRAINT "UserFavoriteProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteProject" ADD CONSTRAINT "UserFavoriteProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createrId_fkey" FOREIGN KEY ("createrId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_confidentPersonId_fkey" FOREIGN KEY ("confidentPersonId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestEvent" ADD CONSTRAINT "GuestEvent_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestEvent" ADD CONSTRAINT "GuestEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteEvent" ADD CONSTRAINT "FavoriteEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteEvent" ADD CONSTRAINT "FavoriteEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
