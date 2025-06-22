'use client';
import React, { useState } from 'react';
import PDFHistory from '@/app/components/historyPdf/PDFHistory';
import ChatLog from '@/app/components/historyPdf/ChatLog';

export default function HistoryView() {
  const [selectedUploadId, setSelectedUploadId] = useState<number | null>(null);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <PDFHistory onSelect={setSelectedUploadId} />
      {selectedUploadId && <ChatLog uploadId={selectedUploadId} />}
    </div>
  );
}
