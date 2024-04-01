-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "createrId" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatingScope" (
    "ratingId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "ratingScore" INTEGER NOT NULL,

    CONSTRAINT "RatingScope_pkey" PRIMARY KEY ("ratingId","tagId")
);

-- CreateTable
CREATE TABLE "Score" (
    "ratingId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "ratingScore" INTEGER NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("ratingId","studentId")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_createrId_fkey" FOREIGN KEY ("createrId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingScope" ADD CONSTRAINT "RatingScope_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingScope" ADD CONSTRAINT "RatingScope_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
