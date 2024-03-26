import { Module } from "@nestjs/common";
import { AppService } from "src/app.service";
import { RedisService } from "./redis.service";

@Module({
  imports: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static forRoot() {
    return {
      module: RedisModule,
      providers: [RedisService],
      exports: [RedisService],
    };
  }
}
