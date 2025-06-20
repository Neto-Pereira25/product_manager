/*
  Warnings:

  - A unique constraint covering the columns `[productId,removedAt]` on the table `ProductDiscount` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProductDiscount_productId_key";

-- CreateIndex
CREATE INDEX "ProductDiscount_productId_idx" ON "ProductDiscount"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductDiscount_productId_removedAt_key" ON "ProductDiscount"("productId", "removedAt");
