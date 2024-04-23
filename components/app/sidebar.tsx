'use client'

import React, { FormEvent, useReducer } from 'react'
import { ChatType } from '@/db/schema/chats'
import Link from 'next/link'
import { cn } from '@/lib'
import { useChatApp, useForm } from '@/hooks'
import { Form, Input, Modal, Select, Button } from '../ui'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createChat } from '@/endpoints/chats'
import toast from 'react-hot-toast'

type Props = {
  chats: ChatType[],
  chatId: number
}

export function SideBar({ chats, chatId }: Props) {
  const router = useRouter()

  const queryClient = useQueryClient()

  const initState = { createChat: false }

  const [modals, updateModals] = useReducer((prev: typeof initState, next: Partial<typeof initState>): typeof initState => {
    return { ...prev, ...next }
  }, initState)

  const toggleCreateChatModal = () => updateModals({ createChat: !modals.createChat })

  const { mutate, isPending } = useMutation({
    mutationFn: createChat,
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['chats'] })
      router.refresh();
      toggleCreateChatModal();
      toast.success('Chat successfully created.');
    },
    onError(err: any) {
      const { message } = err.response?.data;
      toast.error(message)
    },
  })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { title, name, website } = values
    mutate({ title, name, website });
  };
  const { resetReference } = useChatApp();

  const { values, onChange } = useForm({
    title: "",
    name: "",
    website: ""
  });

  if (chats.length < 0) return <></>
  return (
    <>
      <div className='w-full h-screen p-4 text-gray-200 bg-black overflow-x-auto'>
        <Button variant={'ghost'} size={'full'} onClick={toggleCreateChatModal}>
          New Chat
        </Button>
        <div className="flex flex-col gap-2 mt-4">
          {chats?.map(chat => (
            <Link key={chat?.id} href={`/chat/${chat.id}`} onClick={() => {
              resetReference()
            }}>
              <div className={cn('rounded-lg p-3 text-slate-300 flex items-center', {
                'bg-blue-600 text-white': chat.id === chatId,
                'hover:text-white': chat.id !== chatId,
              })}>
                <p className='w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>{chat.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Modal isShown={modals.createChat} onClose={toggleCreateChatModal} title='Start a conversation'>
        <Form onSubmit={onSubmit}>
          <Input
            value={values.title}
            onChange={onChange}
            label='Title'
            className='w-full'
            name="title"
            required
          />
          <Input
            value={values.name}
            onChange={onChange}
            label='Blog name'
            className='w-full'
            name="name"
            required
          />
          <Select
            name='website'
            onChange={onChange}
            value={values.website}
            options={[
              { value: 'hey.com', name: 'world.hey.com' }
            ]}
            required={true}
            label="Blog Website"
          />
          <Button className='w-full' variant={'dark'} loading={isPending}>Create</Button>
        </Form>
      </Modal>
    </>
  )
}
