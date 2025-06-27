'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useClerkInfo } from '../../hooks/ClerkInfo';

export default function PDFHistory({ onSelect }: { onSelect: (uploadId: number) => void }) {
  const [history, setHistory] = useState([]);
  const userInfo = useClerkInfo();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.post('http://127.0.0.1:5000/history', {
          ...userInfo,
        });
        setHistory(res.data.uploads);
      } catch (err) {
        console.error('Failed to fetch history:', err);
      }
    };

    if (userInfo?.clerk_user_id) {
      fetchHistory();
    }
  }, [userInfo?.clerk_user_id]);

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Your Uploaded PDFs</h2>
      {history.length === 0 ? (
        <p className="text-sm text-gray-500">No uploads found.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((file: any) => (
            <li
              key={file.upload_id}
              className="cursor-pointer p-2 rounded bg-gray-100 hover:bg-gray-200"
              onClick={() => onSelect(file.upload_id)}
            >
              <div className="font-medium">{file.filename}</div>
              <div className="text-sm text-gray-500">
                Uploaded: {new Date(file.upload_time).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
