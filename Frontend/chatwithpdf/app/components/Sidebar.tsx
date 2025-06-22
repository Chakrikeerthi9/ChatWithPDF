import FileUpload from './FileUpload'

const Sidebar = ({setUploadId}: {setUploadId: (uploadId: string) => void}) => {

  return (
        <section className=" bg-white h-full flex flex-col p-6">
          <h1 className="font-semibold text-lg">ChatWith<b className="text-blue-800">PDF</b></h1>
          <h2 className="text-sm text-gray-600 mb-4 italic hidden md:block">
          "ChatWithPDF is a real-time educational tool that empowers users to interactively engage with study materials. It transforms static PDFs into dynamic learning experiences through instant Q&A and summarization."
          </h2>
          <h3 className="text-sm text-blue-400 mb-4 pt-3 pb-3">
            Upload your PDF files here and start chatting with them
          </h3>
          <FileUpload setUploadId={setUploadId} />
        </section>
  )
}

export default Sidebar
