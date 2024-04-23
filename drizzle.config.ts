import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  schema: "./db/schema/*",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  out: "./db/migrations",
} satisfies Config