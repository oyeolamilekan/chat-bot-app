import { db } from "@/db";
import { chats, messages } from "@/db/schema";
import { fetchHeyPosts } from "@/lib/crawler";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json()
  const { title, name, website } = body;
  const chat_id = await db.insert(chats).values({
    name: name,
    title: title,
    website: website
  }).returning({
    insertedId: chats.id
  })
  await fetchHeyPosts(name, title)
  revalidatePath('/chat/[chatId]', 'page')
  return NextResponse.json({  chat_id: chat_id[0].insertedId }, { status: 200 })
}