import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  verbose: true,
  strict: true,
  dbCredentials: {
    host: "localhost",
    user: "postgres",
    password: "long1071996",
    database: "mimy_wedding",
  }
});
