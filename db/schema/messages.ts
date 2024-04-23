import { chats } from "./chats";
import { integer, json, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const messages = pgTable('messages', {
  id: serial("id").primaryKey(),
  chatId: integer('chat_id').references(() => chats.id).notNull(),
  role: varchar('role', { enum: ['user', 'assistant'] }).notNull(),
  content: text('content'),
  references: json("references"),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type MessageType = typeof messages.$inferInsert;
