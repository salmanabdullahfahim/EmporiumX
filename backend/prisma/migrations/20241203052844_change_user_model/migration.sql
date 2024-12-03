/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `isSuspended` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `vendors` table. All the data in the column will be lost.
  - You are about to drop the column `isSuspended` on the `vendors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "isDeleted",
DROP COLUMN "isSuspended";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSuspended" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "vendors" DROP COLUMN "isDeleted",
DROP COLUMN "isSuspended";
