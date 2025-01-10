import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: "postgres://aryarajvaidya:password@localhost:5432/mydb",
});

export const db = drizzle(pool);
