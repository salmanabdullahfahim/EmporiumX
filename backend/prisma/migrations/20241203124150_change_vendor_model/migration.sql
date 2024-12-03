/*
  Warnings:

  - You are about to drop the column `profilePhoto` on the `vendors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vendors" DROP COLUMN "profilePhoto",
ADD COLUMN     "logo" TEXT;
