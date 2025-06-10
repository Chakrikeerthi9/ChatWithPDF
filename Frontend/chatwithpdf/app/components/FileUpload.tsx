'use client';

import { FileUploader } from '@/components/upload/multi-file';
import {
  UploaderProvider,
  type UploadFn,
} from '@/components/upload/uploader-provider';
import { useEdgeStore } from '@/lib/edgestore';
import * as React from 'react';
import axios from 'axios';

export function FileUpload() {
  const { edgestore } = useEdgeStore();

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
      });
      // you can run some server action or api here
      // to add the necessary data to your database


      console.log(res.url);

      const fileUrl = res.url;
      await axios.post('http://127.0.0.1:5000/upload', 
        { fileUrl },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      return res;
    },
    [edgestore],
  );

  return (
    <UploaderProvider uploadFn={uploadFn} autoUpload>
      <FileUploader
        maxFiles={5}
        maxSize={1024 * 1024 * 1} // 1 MB
        accept={{
          'application/pdf': [],
          'text/plain': ['.pdf'],
        }}
        className='w-[90%]'
      />
    </UploaderProvider>
  );
}

export default FileUpload;