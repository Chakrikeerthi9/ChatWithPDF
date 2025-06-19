"use client";
import { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { type: "question", text: "What is the summary of page 1?" },
    { type: "answer", text: "Page 1 introduces the topic and provides background on the research problem." },
  ]);
  const [input, setInput] = useState("");
  const { user } = useUser();
  const name = user?.firstName || "User";

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { type: "question", text: input }]);
    setInput("");
    // Later: send to backend and add response
  };

  return (
    <div className="flex flex-col h-full">
  {/* Header */}
  <header className="mb-4">
    <div className="flex items-center justify-between pb-2">
      <div>
        <h1 className="text-xl font-bold">ChatWithPDF</h1>
        <p className="text-sm text-gray-600">Hello, {name}</p>
      </div>
      <p className="text-sm text-gray-500 hidden sm:block">
        Ask anything from your uploaded document.
      </p>
      <UserButton />
    </div>
  </header>

  {/* Messages */}
  <div className="flex-1 overflow-y-auto space-y-4 pb-4">
    {messages.map((msg, i) => (
      <div key={i} className={`flex ${msg.type === "question" ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-[80%] px-6 py-5 rounded-2xl shadow text-sm sm:text-base ${
            msg.type === "question"
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-100 text-gray-900 rounded-bl-none"
          }`}
        >
          {msg.text}
        </div>
      </div>
    ))}
  </div>

  {/* Input */}
  <div className="pt-3">
    <div className="flex items-center border rounded-full px-4 py-2 shadow-sm bg-gray-100">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something about your PDF..."
        className="flex-1 bg-transparent outline-none text-sm"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend} className="text-blue-600 hover:text-blue-800">
        <SendHorizonal size={20} />
      </button>
    </div>
  </div>
</div>
)
}

export default ChatBox;