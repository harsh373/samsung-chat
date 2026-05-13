
import { useState } from "react";
import ChatWindow from "./components/ChatWindow.jsx";
import InputBar from "./components/InputBar.jsx";
import { sendMessage } from "./api/chatService.js";

export default function App() {
  
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  
  const [error, setError] = useState(null);

  async function handleSend(text) {
    if (!text.trim()) return; 

   
    const userMessage = { role: "user", content: text };

    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages); 

    setLoading(true); 
    setError(null);    

    try {
      
      const reply = await sendMessage(updatedMessages);

      setMessages([...updatedMessages, { role: "assistant", content: reply }]);
    } catch {
      setError("Failed to get a response. Is the server running?");
    } finally {
      setLoading(false); 
    }
  }

  return (

  <div
    className="
      min-h-screen
      bg-[#020617]
      flex
      items-center
      justify-center
      p-4
    "
  >

    
    <div
      className="
        w-full
        max-w-4xl
        h-[90vh]
        bg-gray-950
        border
        border-gray-800
        rounded-3xl
        shadow-2xl
        flex
        flex-col
        overflow-hidden
      "
    >

     
      <header
        className="
          bg-gray-900
          border-b
          border-gray-800
          px-6
          py-4
          flex
          items-center
          gap-3
        "
      >

        
        <div
          className="
            w-3
            h-3
            rounded-full
            bg-blue-500
          "
        />

       
        <div>

          <h1
            className="
              text-lg
              font-semibold
              tracking-wide
              text-white
            "
          >
            SamsungBot
          </h1>

          <p
            className="
              text-xs
              text-gray-500
            "
          >
            Powered by Groq AI
          </p>

        </div>

      </header>

      
      {error && (

        <div
          className="
            bg-red-900/40
            border-b
            border-red-800
            text-red-300
            px-6
            py-3
            text-sm
          "
        >
          {error}
        </div>

      )}

    
      <ChatWindow
        messages={messages}
        loading={loading}
      />

      
      <InputBar
        onSend={handleSend}
        loading={loading}
      />

    </div>

  </div>

);
}