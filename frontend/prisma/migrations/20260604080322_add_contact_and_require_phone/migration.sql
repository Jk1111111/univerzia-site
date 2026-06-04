/*
  Warnings:

  - Made the column `phone` on table `lead` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `lead` MODIFY `phone` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Contact` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `topic` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `submittedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Contact_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
