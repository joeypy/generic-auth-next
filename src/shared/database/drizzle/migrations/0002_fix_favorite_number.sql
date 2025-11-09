-- Fix favorite_number column to allow NULL values
ALTER TABLE "user" ALTER COLUMN "favorite_number" DROP NOT NULL;
