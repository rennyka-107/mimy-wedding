import { defineConfig } from "drizzle-kit";

console.log(process.env.DB_HOST);

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  verbose: true,
  strict: true,
  dbCredentials: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "long1071996",
    database: process.env.DB_NAME || "mimy_wedding",
  }
});
