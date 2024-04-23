'use client'

import { useChatApp } from '@/hooks';
import React from 'react'

interface Reference {
  title: string;
  body: string;
  url: string
}

export function Reference() {
  const { state } = useChatApp();
  
  return (
    <div className='relative max-h-screen overflow-scroll'>
      <h2 className="font-semibold text-1xl">Reference</h2>
      {state.references?.map((reference: Reference, key: number) => {
        return (
          <a href={reference.url} key={key} target='__blank__'>
            <p className='text-blue-500 underline my-3'>{reference.title}</p>
          </a>
        )
      })}
    </div>
  )
}
