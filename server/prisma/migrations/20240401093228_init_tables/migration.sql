-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'OUTCOME');

-- CreateEnum
CREATE TYPE "Recurrence" AS ENUM ('NONE', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('FOOD', 'TRANSPORT', 'HEALTH', 'EDUCATION', 'ENTERTAINMENT', 'SPORTS', 'OTHER');

-- CreateTable
CREATE TABLE "tbl_user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_transaction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "type" "TransactionType" NOT NULL DEFAULT 'INCOME',
    "recurrence" "Recurrence" NOT NULL DEFAULT 'NONE',
    "recurrence_interval" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "category" "TransactionCategory" NOT NULL DEFAULT 'OTHER',

    CONSTRAINT "tbl_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_email_key" ON "tbl_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_transaction_name_key" ON "tbl_transaction"("name");

-- CreateIndex
CREATE INDEX "tbl_transaction_user_id_idx" ON "tbl_transaction"("user_id");

-- CreateIndex
CREATE INDEX "tbl_transaction_user_id_name_idx" ON "tbl_transaction"("user_id", "name");

-- CreateIndex
CREATE INDEX "tbl_transaction_user_id_type_idx" ON "tbl_transaction"("user_id", "type");

-- CreateIndex
CREATE INDEX "tbl_transaction_user_id_category_idx" ON "tbl_transaction"("user_id", "category");

-- CreateIndex
CREATE INDEX "tbl_transaction_type_recurrence_recurrence_interval_idx" ON "tbl_transaction"("type", "recurrence", "recurrence_interval");

-- AddForeignKey
ALTER TABLE "tbl_transaction" ADD CONSTRAINT "tbl_transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
