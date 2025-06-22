import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Header = ({name}: {name: string}) => {
  return (
    <header className="mb-4">
    <div className="flex items-center justify-between pb-2">
      <div>
        <h1 className="text-xl font-bold">ChatWithPDF</h1>
        <p className="text-sm text-gray-600">Hello, {name}</p>
      </div>
      <p className="text-sm text-gray-500 hidden sm:block">
        Ask anything from your uploaded document.
      </p>
      <UserButton />
    </div>
  </header>
  )
}

export default Header
