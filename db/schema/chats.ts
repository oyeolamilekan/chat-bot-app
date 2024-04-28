import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const chats = pgTable('chats', {
  id: serial("id").primaryKey(),
  userId: varchar('user_id', { length: 250 }).notNull(),
  title: varchar('title', { length: 250 }).notNull(),
  name: varchar('name', { length: 250 }).notNull(),
  website: varchar('website', { length: 250 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type ChatType = typeof chats.$inferInsert;
