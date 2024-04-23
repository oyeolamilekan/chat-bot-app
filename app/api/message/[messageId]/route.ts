import { db } from "@/db";
import { messages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { messageId: string } }) => {
  const { messageId } = params
  const message = await db.select({ references: messages.references }).from(messages).where(eq(messages.id, parseInt(messageId)));
  return NextResponse.json(message[0], { status: 200 });
}