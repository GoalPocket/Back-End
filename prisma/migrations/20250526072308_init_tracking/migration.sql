/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Target` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Tracking" ADD COLUMN     "notes" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Target_name_key" ON "Target"("name");
