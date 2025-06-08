-- DropForeignKey
ALTER TABLE "Target" DROP CONSTRAINT "Target_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tracking" DROP CONSTRAINT "Tracking_userId_fkey";

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracking" ADD CONSTRAINT "Tracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
