import { db } from "@/db";
import { waitlist } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json()
  const { email } = body;
  await db.insert(waitlist).values({
    email: email,
  })
  return NextResponse.json({ message: "You have successfully been added to the waitlist.", data: null }, { status: 200 })
}