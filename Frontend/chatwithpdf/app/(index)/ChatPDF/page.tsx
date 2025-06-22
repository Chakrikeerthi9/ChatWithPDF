'use client';
import Sidebar from "@/app/components/Sidebar"
import ChatBox from "@/app/components/ChatBox"
import React from "react";
import { useEffect } from "react";

const ChatPDF = () => {
  const [uploadId, setUploadId] = React.useState<string | null>(null);


  return (
  <div className="layout-wrapper">
    <div className="main-container">
      {/* Sidebar */}
      <Sidebar setUploadId={setUploadId} />

      {/* Main Chat Container */}
      <div className="content-box">
        <ChatBox uploadId={uploadId || ""} />
      </div>
  </div>
</div>

  )
}

export default ChatPDF
