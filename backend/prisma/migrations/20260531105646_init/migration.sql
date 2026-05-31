/*
  Warnings:

  - The values [attendee,organizer] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `category` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[participantId,eventId]` on the table `Registration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participantId` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qrCode` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'ORGANIZER', 'PARTICIPANT');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'PARTICIPANT';
COMMIT;

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_userId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "category",
DROP COLUMN "date",
DROP COLUMN "image",
DROP COLUMN "price",
DROP COLUMN "time",
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "userId",
ADD COLUMN     "participantId" TEXT NOT NULL,
ADD COLUMN     "qrCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "nom",
DROP COLUMN "prenom",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'PARTICIPANT';

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_participantId_eventId_key" ON "Registration"("participantId", "eventId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
