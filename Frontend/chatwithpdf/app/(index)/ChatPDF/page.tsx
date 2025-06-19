import Sidebar from "@/app/components/Sidebar"
import ChatBox from "@/app/components/ChatBox"

const ChatPDF = () => {

  return (
    <div className="layout-wrapper">
  <div className="main-container">
    {/* Sidebar */}
    <Sidebar />

    {/* Main Chat Container */}
    <div className="content-box">
      <ChatBox />
    </div>
  </div>
</div>

  )
}

export default ChatPDF
