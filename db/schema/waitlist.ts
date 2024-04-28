import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const waitlist = pgTable('waitlist', {
  id: serial("id").primaryKey(),
  email: varchar('email', { length: 250 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type WaitListType = typeof waitlist.$inferInsert;
