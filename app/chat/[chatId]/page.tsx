import React from 'react'
import { desc } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { chats } from '@/db/schema';
import { SideBar } from '@/components/app';
import { Chat } from '@/components/app/chat';
import { Reference } from '@/components/app/reference';

type Props = {
  params: {
    chatId: string
  }
}

const Page = async ({ params: { chatId } }: Props) => {

  const _chats = await db.select().from(chats).orderBy(desc(chats.createdAt))

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));

  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* chat sidebar */}
        <div className='flex-[1] max-w-xs'>
          <SideBar chats={_chats} chatId={parseInt(chatId)} />
        </div>
        {/* pdf viewer */}
        <div className='max-h-screen flex-[6]'>
          <Chat chatId={parseInt(chatId)} currentChat={currentChat!} />
        </div>
        {/* chat componet */}
        <div className='flex-[2] p-4 border-l-[1px] border-l-slate-300'>
          <Reference />
        </div>
      </div>
    </div>
  )
}
export default Page; 
