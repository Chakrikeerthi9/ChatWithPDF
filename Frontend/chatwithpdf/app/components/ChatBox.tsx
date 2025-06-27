"use client";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Inputbar from "./Inputbar";
import Header from "./Header";

const ChatBox = ({ uploadId }: { uploadId: string }) => {
  const [messages, setMessages] = useState<{ question: string; answer?: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const name = user?.firstName || "User";
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const currentInput = input;
    setInput("");

    if (!uploadId) {
      console.warn("No uploadId found");
      return;
    }

    // 1. Add question immediately
    setMessages((prev) => [...prev, { question: currentInput }]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json", "clerk-user-id": user?.id || "" },
        body: JSON.stringify({ question: currentInput, upload_id: parseInt(uploadId) }),
      });

      const data = await response.json();
      
      if (response.status === 429) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].answer = "You have reached the rate limit. Please try again later.";
          return updated;
        })
        setIsLoading(false);
        return;
      }

      const answer = data.answer;
      // 2. Add answer to the last question
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].answer = answer;
        return updated;
      });
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].answer = "Sorry, I couldn't answer that question.";
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Header name={name} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 px-2">
        {messages.map((msg, i) => (
          <div key={i}>
            <div className="flex justify-end">
              <div className="max-w-[80%] px-6 py-4 rounded-2xl bg-blue-600 text-white text-sm sm:text-base shadow rounded-br-none my-2">
                {msg.question}
              </div>
            </div>
            {msg.answer && (
              <div className="flex justify-start text-left mt-1">
                <div className="max-w-[80%] px-6 py-4 rounded-2xl bg-gray-100 text-gray-900 text-sm sm:text-base shadow rounded-bl-none my-2">
                  {msg.answer}
                </div>
              </div>
            )}
          </div>
        ))}

         {/* Loading animation */}
        {isLoading && (
          <div className="flex justify-start mt-1">
            <div className="max-w-[80%] px-6 py-4 rounded-2xl bg-gray-100 text-gray-700 text-sm sm:text-base shadow rounded-bl-none my-2 animate-pulse">
              Thinking...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <Inputbar input={input} setInput={setInput} handleSend={handleSend} />
    </div>
  );
};

export default ChatBox;
