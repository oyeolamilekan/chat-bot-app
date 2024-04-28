'use client'

import React, { useRef } from 'react'
import { Input, Button } from '../ui'
import { Message, useChat } from "ai/react";
import { ArrowDown, Bot, BoxIcon, CornerDownLeft, Link2, Loader, Square } from "lucide-react"
import { cn, formatDate, isValidValue } from '@/lib';
import { useChatApp, useScrollAnchor } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ChatType } from '@/db/schema';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

type Props = {
  chatId: number,
  currentChat: ChatType
}

interface ExtendedMessage extends Message {
  references?: [];
}

export const Chat = ({ chatId, currentChat }: Props) => {

  const { setReference } = useChatApp();

  const messageId = useRef<number>()

  const { data, isLoading, refetch: refresh } = useQuery({
    queryKey: ["chat", chatId],
    enabled: isValidValue(chatId),
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/messages", {
        chatId,
      });
      setMessages(response.data)
      return response.data;
    },
  });


  const { input, handleInputChange, handleSubmit, messages, setMessages, isLoading: aiLoading, stop } = useChat({
    api: "/api/chat",
    body: { chatId },
    initialMessages: data || [],
    onFinish: async () => {
      await refresh()
      toast.success('Message has been updated.')
    }
  })

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } = useScrollAnchor()

  if (!chatId) return <div className='flex flex-col justify-center items-center h-screen'>
    <BoxIcon />
    <h1 className="text-2xl font-semibold">
      No current chats.
    </h1>
  </div>

  if (isLoading) return <div className='flex justify-center items-center h-screen'>
    <Loader className="absolute h-8 w-8 text-black animate-spin" />
  </div>

  return (
    <div className="h-screen">
      <h2 className="px-4 py-2 font-semibold text-2xl">{currentChat?.title}</h2>

      {aiLoading && (
        <div className="absolute z-10 top-0 left-0 right-0 mt-16 flex justify-center">
          <div className="px-4 py-2 bg-black rounded text-white text-center shadow-lg flex space-x-2 justify-center items-center"><Bot /> <span>AI is generating.</span></div>
        </div>
      )}

      <div className="flex flex-col overflow-auto h-[95%]" ref={scrollRef}>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'absolute right-[35%] bottom-0 z-10 bg-background transition-opacity duration-300 sm:right-[30%] md:bottom-[15%] bg-white',
            isAtBottom ? 'opacity-0' : 'opacity-100'
          )}
          onClick={() => scrollToBottom()}
        >
          <ArrowDown />
          <span className="sr-only">Scroll to bottom</span>
        </Button>
        <div className="flex-1 px-3 pt-3 relative pb-[200px]" ref={messagesRef}>
          {messages.map((message: ExtendedMessage) => {
            return (
              <div key={message.id}
                className={cn('flex my-5', {
                  'justify-end pl-10': message.role === 'user',
                  'justify-start pr-10': message.role === 'assistant'
                })}
              >
                <div>
                  <div className={cn('rounded-lg px-3 text-sm py-2 shadow-md', {
                    "bg-white text-gray-700": message.role === 'user',
                    "bg-gray-800 text-white markdown-content": message.role === 'assistant',
                  })}>
                    <p>{<ReactMarkdown>{message.content}</ReactMarkdown>}</p>
                  </div>
                  {message.references && <div className='cursor-pointer bg-blue-600 text-white p-1 w-fit rounded-b-lg ml-2 px-4 text-sm'
                    onClick={() => {
                      if (Number.isInteger(message.id) && message.role === 'assistant') {
                        messageId.current = Number(message.id)
                        setReference(message?.references ?? [])
                      }
                    }}>
                    <span className='flex gap-2 items-center mb-2'>Show references <Link2 /></span>
                  </div>}
                  <p className={cn("text-xs py-2 text-gray-500", {
                    "text-right": message.role === 'user',
                    "ml-3 text-left": message.role === 'assistant',
                  })}>{message.createdAt && formatDate(message.createdAt.toString())}</p>
                </div>
              </div>
            )
          })}
          <div className="h-px w-full" ref={visibilityRef} />
        </div>
        <div className='flex justify-center sm:px-4 bottom-0 fixed w-[54.5%]'>
          <div className='bg-white rounded-t-md py-10 px-10 space-y-4 border-t bg-background shadow-lg sm:rounded-t-xl sm:border md:py-4 w-5/6 '>
            <form onSubmit={handleSubmit} className='flex flex-row space-x-4 mt-4'>
              <Input value={input} onChange={handleInputChange} placeholder='Ask anything?' className='w-full' variant={'noFocus'} />
              {!aiLoading && <Button variant={'dark'} size={'icon'} className='mt-2'>
                <CornerDownLeft />
              </Button>}
              {aiLoading && <Button variant={'dark'} size={'icon'} className='mt-2' onClick={stop}>
                <Square />
              </Button>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}