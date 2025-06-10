import FileUpload from './FileUpload'
import { UserButton } from '@clerk/nextjs'

const Sidebar = () => {
  return (
    <div className="w-1/4 gap-1 flex flex-col justify-start items-start h-[90vh]">
          <div className='py-4'>
          <UserButton />
          <h1 className="font-semibold mb-4 font-sans">Hello, <b className='text-blue-800'>User</b></h1>
          <p>Upload your PDF file's here and start chatting with them</p>
          </div>
          <FileUpload />
      </div>
  )
}

export default Sidebar
