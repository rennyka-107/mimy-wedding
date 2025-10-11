import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from ".";

// Chạy migration để áp dụng schema với database
const runMigration = async () => {
  try {
    console.log("Running migrations...");
    await migrate(db, { migrationsFolder: "./src/db/migrations" });
    console.log("Migrations completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error during migrations:", error);
    process.exit(1);
  }
};

runMigration();
