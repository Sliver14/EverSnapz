import { pgTable, text, timestamp, uuid, boolean, decimal, pgEnum, jsonb } from "drizzle-orm/pg-core";

export const planEnum = pgEnum("plan", ["FREE", "PRO", "PREMIUM"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  password: text("password"),
  name: text("name"),
  image: text("image"),
  googleId: text("google_id").unique(),
  plan: planEnum("plan").default("FREE"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  hostId: uuid("host_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  date: timestamp("date"),
  coverPhotoUrl: text("cover_photo_url"),
  coverPhotoPublicId: text("cover_photo_public_id"),
  qrCodeUrl: text("qr_code_url"),
  isPaid: boolean("is_paid").default(false),
  settings: jsonb("settings").default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const photos = pgTable("photos", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: uuid("event_id").references(() => events.id).notNull(),
  url: text("url").notNull(),
  publicId: text("public_id").notNull(),
  guestName: text("guest_name"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  status: text("status").notNull(),
  paymentId: text("payment_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(), // in NGN
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
