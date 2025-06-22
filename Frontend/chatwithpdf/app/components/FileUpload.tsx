'use client';

import { FileUploader } from '@/components/upload/multi-file';
import {
  UploaderProvider,
  type UploadFn,
} from '@/components/upload/uploader-provider';
import { useClerkInfo } from "../hooks/ClerkInfo"
import { useEdgeStore } from '@/lib/edgestore';
import * as React from 'react';
import axios from 'axios';

export function FileUpload({setUploadId}: {setUploadId: (uploadId: string) => void}) {
  const { edgestore } = useEdgeStore();
  const userInfo = useClerkInfo();
  const [isUploading, setIsUploading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      setIsUploading(true);
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
      });
      // you can run some server action or api here
      // to add the necessary data to your database


      console.log(res.url);
      const fileUrl = res.url;

       const response =await axios.post('http://127.0.0.1:5000/upload', 
        { fileUrl, ...userInfo },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        setMessage("✅ Uploaded Successfully");
        setUploadId(data.upload_id.toString());
        localStorage.setItem("uploadId", data.upload_id.toString());
      } else {
        setMessage(`❌ Error: ${response.data.message}`);
      }
      console.log("upload success")
      setIsUploading(false);
      return res;
    },
    [edgestore, userInfo],
  );

  return (
    <>
    <UploaderProvider uploadFn={uploadFn} autoUpload>
      <FileUploader
        maxFiles={5}
        maxSize={1024 * 1024 * 10} // 1 MB
        accept={{
          'application/pdf': [],
          'text/plain': ['.pdf'],
        }}
        className='bg-gray-100 w-full'
      />
      {message && (
        <p className="mt-4 text-sm text-green-600 dark:text-green-400">
          {message}
        </p>
      )}
      {isUploading && (
        <p className="mt-4 text-sm text-blue-600 dark:text-blue-400">
          Uploading...
        </p>
      )}
    </UploaderProvider>
      </>
    
    
  );
}

export default FileUpload;