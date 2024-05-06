/*
  Warnings:

  - Added the required column `dateTimeSent` to the `Notifacation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notifacation" ADD COLUMN     "dateTimeSent" TIMESTAMP(3) NOT NULL;
