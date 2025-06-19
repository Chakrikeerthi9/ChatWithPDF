import FileUpload from './FileUpload'

const Sidebar = () => {
  return (
        <aside className="w-1/4 bg-white h-full flex flex-col">
          <h1 className="font-semibold mb-2 text-lg">Hello, <b className="text-blue-800">User</b></h1>
          <p className="text-sm text-gray-600 mb-4">
            Upload your PDF files here and start chatting with them
          </p>
          <FileUpload />
        </aside>
  )
}

export default Sidebar
