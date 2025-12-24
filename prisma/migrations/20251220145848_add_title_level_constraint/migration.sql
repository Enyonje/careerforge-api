/*
  Warnings:

  - Added the required column `seniority` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `level` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoleSeniority" AS ENUM ('JUNIOR', 'MID', 'SENIOR', 'LEAD');

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "seniority" "RoleSeniority" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "level",
ADD COLUMN     "level" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "RoleLevel";

-- CreateIndex
CREATE UNIQUE INDEX "Role_title_level_key" ON "Role"("title", "level");
