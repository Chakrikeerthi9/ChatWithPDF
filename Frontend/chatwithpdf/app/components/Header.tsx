import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Header = ({name}: {name: string}) => {
  return (
    <header className="w-full bg-gradient-to-b from-sky-50 to-sky-75 border-b border-gray-200">
    <div className="flex flex-row justify-between items-center p-6">
      <div className="flex flex-col items-start">
        <h1 className="text-sm text-gray-600">Hello, <b className="text-blue-800">{name}</b></h1>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row items-center gap-3">
          <Link href="/History">
            <h2 className="text-md text-gray-600 hover:text-blue-800 hover:underline">
              History
            </h2> 
          </Link>
          <Link href="/Payment">
            <h2 className="text-md text-gray-600 hover:text-blue-800 hover:underline">
              Payment
            </h2>
          </Link>
        </div>
        <div className='hidden md:block'>
          <UserButton/>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header
