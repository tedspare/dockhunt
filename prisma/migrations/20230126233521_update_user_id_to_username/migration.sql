BEGIN;

-- Default values for updatedAt
ALTER TABLE "App" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Dock" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "DockItem" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- Update User columns
ALTER TABLE "User" RENAME COLUMN "twitterHandle" TO "username";
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

COMMIT;
