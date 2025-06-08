/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Target` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Target_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Target_userId_name_key" ON "Target"("userId", "name");
