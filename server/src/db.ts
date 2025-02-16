import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT) || 5432, 
  ssl: {
    rejectUnauthorized: false,
  },
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
