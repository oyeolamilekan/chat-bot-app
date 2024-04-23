import { db } from "@/db";
import { messages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { chatId } = await req.json();
  const _messages = await db.select().from(messages).where(eq(messages.chatId, chatId));
  return NextResponse.json(_messages, { status: 200 });
};