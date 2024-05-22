import { Check, Code, FileVideo } from "lucide-react";
import { Button, Form, Input, Modal } from "../ui";
import React, { FormEvent, useReducer } from 'react'
import { useForm } from "@/hooks";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { addToWaitList } from "@/endpoints/chats";
import { pushToNewTab } from "@/lib";

export function Hero() {

  const initState = { joinWaitList: false }

  const [modals, updateModals] = useReducer((prev: typeof initState, next: Partial<typeof initState>): typeof initState => {
    return { ...prev, ...next }
  }, initState)

  const toggleWaitListModal = () => updateModals({ joinWaitList: !modals.joinWaitList })

  const { values, onChange } = useForm({
    email: ""
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addToWaitList,
    async onSuccess() {
      toast.success('You have been added to waitlist.');
    },
    onError(err: any) {
      const { message } = err.response?.data;
      toast.error("Error in adding you to the waitlist.")
    },
  })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email } = values
    mutate({ email });
  };

  return (
    <>
      <section className="flex flex-col items-center md:my-36 my-9 p-3">
        <h1 className="md:text-5xl text-3xl font-bold text-center max-w-[700px]">Have a conversation with your favourite authors.</h1>
        <ol className="my-10 space-y-2 md:text-base text-sm">
          <li className="flex items-center justify-center lg:justify-start gap-2"><Check className="text-emerald-600" /> Chat with multiple authors.</li>
          <li className="flex items-center justify-center lg:justify-start gap-2"><Check className="text-emerald-600" /> Self host your app for privacy.</li>
          <li className="flex items-center justify-center lg:justify-start gap-2"><Check className="text-emerald-600" /> Chat with your favourite writers.</li>
        </ol>
        <div className="flex md:flex-row flex-col md:space-x-5 mb-5">
          <Button className="md:my-6 my-5 w-60 rounded-full p-3 space-x-12 group" variant={'dark'} onClick={() => pushToNewTab("https://github.com/oyeolamilekan/chat-bot-app")}>
            View Code <Code className="ml-1 w-4 h-4 fill-primary-content group-hover:scale-110 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Button>
          <Button className="md:my-6 w-60 rounded-full p-3 space-x-12 group" variant={'outline'}>
            Demo video <FileVideo className="ml-1 w-4 h-4 fill-primary-content group-hover:scale-110 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Button>
        </div>
      </section>
      <Modal isShown={modals.joinWaitList} onClose={toggleWaitListModal} title='Buy the source code for $15'>
        <Form onSubmit={onSubmit}>
          <Input
            value={values.title}
            onChange={onChange}
            label='Your email'
            className='w-full'
            name="email"
            type="email"
            required
          />
          <Button className='w-full' variant={'dark'} loading={isPending}>Join Waitlist.</Button>
        </Form>
      </Modal>
    </>
  )
}
