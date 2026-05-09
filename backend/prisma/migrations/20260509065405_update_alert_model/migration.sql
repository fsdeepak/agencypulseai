-- AlterTable
ALTER TABLE "alerts" ADD COLUMN     "stack" TEXT,
ALTER COLUMN "message" DROP NOT NULL;
