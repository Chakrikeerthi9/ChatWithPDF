import { SendHorizonal } from 'lucide-react'
import React from 'react'

const Inputbar = ({input, setInput, handleSend}: {input: string, setInput: (input: string) => void, handleSend: () => void}) => {
  return (
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
  )
}

export default Inputbar
