import { KEY_COUNTER } from "./constants";
import { RedisService } from "./redis/redis.service";

export class Initialize {
  private readonly redis = new RedisService();
  constructor() {
    Promise.all([this.initCounter()])
      .then(() => console.log("Init default configs!"))
      .catch((err) => {
        throw new Error("Fail to initialize default configs");
      });
  }
  async initCounter() {
    const isExist = await this.redis.exists(KEY_COUNTER);
    if (!isExist) {
      await this.redis.incrby(KEY_COUNTER, 10e10);
    }
  }
}
