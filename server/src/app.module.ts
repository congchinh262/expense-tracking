import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "./redis/redis.module";
import { TransactionModule } from "./transaction/transaction.module";

@Module({
  imports: [
    AuthModule,
    PrismaModule.forRoot(),
    ConfigModule.forRoot(),
    RedisModule.forRoot(),
    TransactionModule,
  ],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
