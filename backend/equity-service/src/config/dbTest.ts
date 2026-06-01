import { pool } from "../database/pool";

export const testDB = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
  }
};
