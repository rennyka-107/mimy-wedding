import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Thông tin kết nối
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'rennyka107',
  database: process.env.DB_NAME || 'mimy_wedding',
};

// Tạo URL kết nối
const connectionString = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

// Tạo kết nối
const client = postgres(connectionString);

// Export instance drizzle với schema đã định nghĩa
export const db = drizzle(client, { schema });

// Export db query helpers
export const query = db.query;

// Đảm bảo client được đóng khi cần thiết
export const closeConnection = async () => {
  await client.end();
};
