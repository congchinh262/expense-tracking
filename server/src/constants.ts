export const JWT_SECRET = process.env.JWT_SECRET;
export const KEY_COUNTER = "counter";
export const KEY_URL_CACHE = "url_cache";
export const REDIS_PORT = Number(process.env.REDIS_PORT || 6379);
export const REDIS_HOST = process.env.REDIS_HOST || "localhost";
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "dev";
export const STAGE = process.env.STAGE || "dev";
