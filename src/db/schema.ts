import { 
  pgTable, 
  text, 
  timestamp, 
  uuid, 
  varchar, 
  boolean, 
  primaryKey,
  integer,
  json,
  unique,
  pgEnum,
  bigint
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  password: varchar("password", { length: 255 }),
  image: text("image"),
  emailVerified: timestamp("email_verified"),
  image_limit: integer("image_limit").default(10).notNull(),
  draft_limit: integer("draft_limit").default(1).notNull(),
  draft_used: integer("draft_used").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Google accounts (for OAuth)
export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 255 }).notNull(),
  provider: varchar("provider", { length: 255 }).notNull(),
  providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
  refreshToken: text("refresh_token"),
  accessToken: text("access_token"),
  expiresAt: integer("expires_at"),
  tokenType: varchar("token_type", { length: 255 }),
  scope: varchar("scope", { length: 255 }),
  idToken: text("id_token"),
  sessionState: varchar("session_state", { length: 255 }),
}, (table) => {
  return {
    // Sử dụng unique index thay vì primary key kép
    providerIdIdx: unique().on(table.provider, table.providerAccountId),
  };
});

// Sessions table for NextAuth
export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
});

// Verification tokens
export const verificationTokens = pgTable("verification_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull(),
  expires: timestamp("expires").notNull(),
}, (table) => {
  return {
    // Sử dụng unique index thay vì primary key kép
    tokenIdentifierIdx: unique().on(table.identifier, table.token),
  };
});

// Bảng lưu trữ mã xác thực email
export const verificationCodes = pgTable("verification_codes", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull(),
  code: varchar("code", { length: 6 }).notNull(),
  expires: timestamp("expires").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  verified: boolean("verified").default(false).notNull(),
}, (table) => {
  return {
    emailIdx: unique().on(table.email),
  };
});

// Enum cho trạng thái thiệp cưới
export const invitationStatusEnum = pgEnum('invitation_status', ['draft', 'paid']);

// Bảng thiệp cưới
export const invitations = pgTable("invitations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  status: invitationStatusEnum("status").default("draft").notNull(),
  total_money: integer("total_money").default(0),
  access_number: integer("access_number").default(0),
  date_from: timestamp("date_from"),
  date_to: timestamp("date_to"),
  template_id: varchar("template_id", { length: 100 }),
  data: json("data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Bảng quản lý ảnh người dùng upload
export const images = pgTable("images", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(), // Tên file gốc hoặc tên được generate
  originalName: varchar("original_name", { length: 255 }), // Tên file gốc mà người dùng upload
  path: varchar("path", { length: 500 }).notNull(), // Đường dẫn đến file trong hệ thống
  url: varchar("url", { length: 500 }).notNull(), // URL để truy cập ảnh
  mimeType: varchar("mime_type", { length: 100 }), // Loại file (image/jpeg, image/png,...)
  size: integer("size"), // Kích thước file (bytes)
  used: boolean("used").default(false), // Đánh dấu ảnh đã được sử dụng trong thiệp cưới hay chưa
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Bảng lưu trữ lời nhắn từ form
export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  content: text("content").notNull(),
  status: varchar("status", { length: 20 }).default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Bảng thanh toán
export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  gateway: varchar("gateway", { length: 100 }).notNull(),
  transaction_date: timestamp("transaction_date").notNull(),
  code: varchar("code", { length: 255 }).notNull(),
  content: text("content").notNull(),
  transferAmount: bigint("transfer_amount", { mode: "bigint" }).notNull(),
  transfer_id: bigint("transfer_id", { mode: "bigint" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Bảng đơn hàng
export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: varchar("code", { length: 255 }).notNull().unique(),
  total_money: bigint("total_money", { mode: "bigint" }).notNull(),
  template_id: varchar("template_id", { length: 100 }).notNull(),
  template_price: bigint("template_price", { mode: "bigint" }).notNull(),
  user_id: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  payment_id: uuid("payment_id").references(() => payments.id, { onDelete: "set null" }),
  public_url: varchar("public_url", { length: 500 }),
  public_start: timestamp("public_start"),
  public_end: timestamp("public_end"),
  template_name: varchar("template_name", { length: 255 }).notNull(),
  views: integer("views").default(0).notNull(),
  template_config: json("template_config"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Bảng lời chúc
export const wishes = pgTable("wishes", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  sender: varchar("sender", { length: 255 }).notNull(),
  arrive: boolean("arrive").default(false).notNull(),
  order_id: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  invitations: many(invitations),
  images: many(images),
  orders: many(orders),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  user: one(users, {
    fields: [invitations.userId],
    references: [users.id],
  }),
}));

export const imagesRelations = relations(images, ({ one }) => ({
  user: one(users, {
    fields: [images.userId],
    references: [users.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.user_id],
    references: [users.id],
  }),
  payment: one(payments, {
    fields: [orders.payment_id],
    references: [payments.id],
  }),
  wishes: many(wishes),
}));

export const paymentsRelations = relations(payments, ({ many }) => ({
  orders: many(orders),
}));

export const wishesRelations = relations(wishes, ({ one }) => ({
  order: one(orders, {
    fields: [wishes.order_id],
    references: [orders.id],
  }),
}));
