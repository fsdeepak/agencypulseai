/*
  Warnings:

  - The `environment` column on the `websites` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Env" AS ENUM ('PRODUCTION', 'DEVELOPMENT');

-- AlterTable
ALTER TABLE "websites" DROP COLUMN "environment",
ADD COLUMN     "environment" "Env" NOT NULL DEFAULT 'PRODUCTION';
