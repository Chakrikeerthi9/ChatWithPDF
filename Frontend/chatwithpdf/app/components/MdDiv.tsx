import { UserButton } from '@clerk/nextjs'
import FileUpload from './FileUpload'

const MdDiv = ({setUploadId}: {setUploadId: (uploadId: string) => void}) => {

  return (
        <section className=" bg-white flex flex-col p-6">
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row justify-between'>
                    <h1 className="font-semibold text-lg">ChatWith<b className="text-blue-800">PDF</b></h1>
                </div>
                    <div className=''>
                        <UserButton 
                        appearance={{
                            elements: {
                                background: 'bg-white'
                            }
                        }}
                        />
                    </div>
            </div>
          <h3 className="text-sm text-blue-400 mb-4 pt-3 pb-3">
            Upload your PDF files here and start chatting with them
          </h3>
          <FileUpload setUploadId={setUploadId} />
        </section>
  )
}

export default MdDiv