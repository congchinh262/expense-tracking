import { Module } from "@nestjs/common";
import { BalanceController } from "./balance.controller";
import { BalanceService } from "./balance.service";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [BalanceController],
  providers: [BalanceService, PrismaService],
  exports: [BalanceService],
})
export class BalanceModule {}
