import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT),

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_DATABASE,

  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(() => {
    console.log("PostgreSQL Connected");
  })
  .catch((error) => {
    console.error(
      "PostgreSQL Connection Error",
      error
    );
  });