import { db } from "@/db";
import { chats, messages } from "@/db/schema";
import { fetchHeyPosts } from "@/lib/crawler";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth()
  const body = await req.json()
  const { title, name, website } = body;
  const chat_id = await db.insert(chats).values({
    name: name,
    title: title,
    website: website,
    userId: userId!
  }).returning({
    insertedId: chats.id
  })
  await fetchHeyPosts(name, title)
  revalidatePath('/chat/[chatId]', 'page')
  return NextResponse.json({  chat_id: chat_id[0].insertedId }, { status: 200 })
}