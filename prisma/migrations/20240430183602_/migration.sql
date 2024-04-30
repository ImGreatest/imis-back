-- CreateEnum
CREATE TYPE "RatingScoringType" AS ENUM ('average', 'maximum', 'sum', 'mediana');

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "scoringType" "RatingScoringType" NOT NULL DEFAULT 'average';
