import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,

    port: Number(process.env.REDIS_PORT),
  },
});

redisClient.on("error", (error) => {
  console.error("Redis Error", error);
});

(async () => {
  await redisClient.connect();

  console.log("Redis Connected");
})();
