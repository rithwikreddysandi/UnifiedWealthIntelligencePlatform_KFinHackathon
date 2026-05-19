import Redis from "ioredis";
import { env } from "./env.js";

export const redis = new Redis(env.REDIS_URL);

redis.on("connect", () => {
  console.log("Redis Connected");
});

redis.on("error", (err: any) => {
  console.error("Redis Error:", err);
});
