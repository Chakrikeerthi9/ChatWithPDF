'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ChatLog({ uploadId }: { uploadId: number }) {
  const [log, setLog] = useState([]);

  console.log(uploadId, "uploadId");
  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await axios.post('http://127.0.0.1:5000/chatlog', {
          upload_id: uploadId,
        });
        setLog(res.data.chatlog);
      } catch (err) {
        console.error('Failed to fetch chat log:', err);
      }
    };

    if (uploadId) fetchLog();
  }, [uploadId]);

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-lg font-semibold">Chat Log</h2>
      {log.length === 0 ? (
        <p className="text-sm text-gray-500">No chat found.</p>
      ) : (
        <ul className="space-y-3">
          {log.map((entry: any, index: number) => (
            <li key={index} className="bg-white rounded shadow p-3">
              <p className="text-sm">
                <strong>Q:</strong> {entry.question}
              </p>
              <p className="text-sm mt-1 text-gray-700">
                <strong>A:</strong> {entry.answer}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(entry.asked_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
