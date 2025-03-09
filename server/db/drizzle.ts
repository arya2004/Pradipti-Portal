import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "pradepti_user",
  password: "pradepti_pass",
  database: "pradepti_db",
  waitForConnections: true,
  connectionLimit: 10,
});

export const db = drizzle(pool);
