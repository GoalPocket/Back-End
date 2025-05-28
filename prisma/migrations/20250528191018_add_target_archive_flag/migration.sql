/*
  Warnings:

  - You are about to drop the column `isArchived` on the `Target` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tracking" DROP CONSTRAINT "Tracking_targetId_fkey";

-- AlterTable
ALTER TABLE "Target" DROP COLUMN "isArchived";

-- AddForeignKey
ALTER TABLE "Tracking" ADD CONSTRAINT "Tracking_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target"("id") ON DELETE CASCADE ON UPDATE CASCADE;
