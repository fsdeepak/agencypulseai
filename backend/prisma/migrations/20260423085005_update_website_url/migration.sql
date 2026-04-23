/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `websites` will be added. If there are existing duplicate values, this will fail.
  - Made the column `url` on table `websites` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "websites" ALTER COLUMN "url" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "websites_url_key" ON "websites"("url");
