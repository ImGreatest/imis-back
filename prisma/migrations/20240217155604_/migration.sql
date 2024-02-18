-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('student', 'teacher', 'kurator');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "spokesPersonId" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_spokesPersonId_key" ON "Company"("spokesPersonId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_spokesPersonId_fkey" FOREIGN KEY ("spokesPersonId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
