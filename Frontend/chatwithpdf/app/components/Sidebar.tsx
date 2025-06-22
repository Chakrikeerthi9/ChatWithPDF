import FileUpload from './FileUpload'
import { useState } from 'react';

const Sidebar = ({setUploadId}: {setUploadId: (uploadId: string) => void}) => {

  return (
        <aside className="w-1/4 bg-white h-full flex flex-col">
          <h1 className="font-semibold mb-2 text-lg">Hello, <b className="text-blue-800">User</b></h1>
          <p className="text-sm text-gray-600 mb-4">
            Upload your PDF files here and start chatting with them
          </p>
          <FileUpload setUploadId={setUploadId} />
        </aside>
  )
}

export default Sidebar
