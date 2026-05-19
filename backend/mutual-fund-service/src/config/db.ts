import { Pool } from "pg";
import { env } from "./env.js";

export const pool = new Pool({
  connectionString: env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false,
  },

  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on("connect", () => {
  console.log("PostgreSQL Connected");
});

pool.on("error", (err: any) => {
  console.error("PostgreSQL Error:", err);
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();

    const result = await client.query("SELECT NOW()");

    console.log("Database Connected:", result.rows[0]);

    client.release();
  } catch (error) {
    console.error("Database Connection Failed:", error);

    process.exit(1);
  }
};
