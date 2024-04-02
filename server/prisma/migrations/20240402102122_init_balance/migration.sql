-- AlterTable
ALTER TABLE "tbl_user" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "tbl_transaction_created_at_idx" ON "tbl_transaction"("created_at");

-- CreateIndex
CREATE INDEX "tbl_user_id_balance_idx" ON "tbl_user"("id", "balance");
