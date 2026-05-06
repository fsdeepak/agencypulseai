/*
  Warnings:

  - You are about to drop the column `resolvedAt` on the `alerts` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `alerts` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `logs` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "alerts_websiteId_status_idx";

-- AlterTable
ALTER TABLE "alerts" DROP COLUMN "resolvedAt",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "logs" DROP COLUMN "metadata";

-- CreateIndex
CREATE INDEX "alerts_websiteId_idx" ON "alerts"("websiteId");
