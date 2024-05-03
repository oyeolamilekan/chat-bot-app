import React from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { Button } from '../ui'
import Link from 'next/link'

export function Navigation() {
  const router = useRouter()

  return (
    <nav className="sticky z-50 inset-x-0 top-0 py-1 backdrop-blur-sm bg-white/30">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        <a href="https://flowbite.com/" className="flex items-center space-x-1 rtl:space-x-reverse">
          <Image
            alt="Video course starter kit"
            height={42}
            src="/icon.svg"
            width={42}
          />
          <span className="self-center hidden md:block font-semibold whitespace-nowrap">ChatAPP</span>
        </a>
        <div className="items-center hidden w-full md:flex md:w-auto text-sm" id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link href="#" className="block py-2 px-3 md:p-0 text-gray-900">Pricing</Link>
            </li>
            <li>
              <Link href="#" className="block py-2 px-3 md:p-0 text-gray-900">Demo</Link>
            </li>
            <li>
              <Link href="#" className="block py-2 px-3 md:p-0 text-gray-900">Hire Me</Link>
            </li>
            <li>
              <Link href="#" className="block py-2 px-3 md:p-0 text-gray-900">Company</Link>
            </li>
          </ul>
        </div>
        <div className='space-x-3'>
          <Button variant={'outline'} size={'small'}>Sign In</Button>
          <Button variant={'dark'} size={'small'}>Sign Up</Button>
        </div>
      </div>
    </nav>

  )
}
