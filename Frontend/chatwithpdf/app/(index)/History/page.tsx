'use client';
import React, { useState } from 'react';
import PDFHistory from '@/app/components/historyPdf/PDFHistory';
import ChatLog from '@/app/components/historyPdf/ChatLog';
import Link from 'next/link';
export default function HistoryView() {

  const [selectedUploadId, setSelectedUploadId] = useState<number | null>(null);

  return (
    <div className="p-6 grid grid-cols-2 gap-4 w-full">
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 shadow-md rounded-lg w-full">
      <Link
       href="/ChatPDF"
       className="text-blue-500 hover:text-blue-700 mr-auto"
       >
        Back to Chat
       </Link>
        <PDFHistory onSelect={setSelectedUploadId} />
      </div>
      <div className="flex flex-col items-start justify-start">
        {selectedUploadId && <ChatLog uploadId={selectedUploadId} />}
      </div>
    </div>
  );
}
