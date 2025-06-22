'use client';
import Sidebar from "@/app/components/Sidebar"
import ChatBox from "@/app/components/ChatBox"
import React from "react";
import MdDiv from "@/app/components/MdDiv";

const ChatPDF = () => {
  const [uploadId, setUploadId] = React.useState<string | null>(null);


  return (
  <div className="layout-wrapper w-full h-full">
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Sidebar */}
      <div className="hidden md:block w-1/4">
        <Sidebar setUploadId={setUploadId} />
      </div>
      <div className="block md:hidden">
        <MdDiv setUploadId={setUploadId} />
      </div>

      {/* Main Chat Container */}
      <div className="content-box">
        <ChatBox uploadId={uploadId || ""} />
      </div>
  </div>
</div>

  )
}

export default ChatPDF
