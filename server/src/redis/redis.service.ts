import { Injectable, OnModuleInit } from "@nestjs/common";
import { Redis } from "ioredis";
import { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD } from "src/constants";

@Injectable()
export class RedisService extends Redis {
  constructor() {
    super({
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    });
  }
}
