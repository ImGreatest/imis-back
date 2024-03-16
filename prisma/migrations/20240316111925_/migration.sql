-- CreateTable
CREATE TABLE "Notifacation" (
    "senderId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,

    CONSTRAINT "Notifacation_pkey" PRIMARY KEY ("senderId","recipientId")
);

-- AddForeignKey
ALTER TABLE "Notifacation" ADD CONSTRAINT "Notifacation_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifacation" ADD CONSTRAINT "Notifacation_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
