import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER as string,
  host: process.env.DB_HOST as string,
  database: process.env.DB_NAME as string,
  password: process.env.DB_PASS as string,
  port: Number(process.env.DB_PORT),
});

export const testDBConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Database Connected Successfully!");
    client.release();
  } catch (err) {
    console.error("❌ Database Connection Failed!", err);
    process.exit(1);
  }
};

export default pool;
