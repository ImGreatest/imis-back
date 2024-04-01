-- DropForeignKey
ALTER TABLE "RatingScope" DROP CONSTRAINT "RatingScope_ratingId_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_ratingId_fkey";

-- AddForeignKey
ALTER TABLE "RatingScope" ADD CONSTRAINT "RatingScope_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;
