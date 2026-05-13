
import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble.jsx";
import TypingIndicator from "./TypingIndicator.jsx";

export default function ChatWindow({
  messages = [],
  loading = false,
}) {

  const bottomRef = useRef(null);

  
  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);

  return (

    <div
      className="
        flex-1
        overflow-y-auto
        px-4
        py-6
        sm:px-6
        bg-[#0f172a]
      "
    >

      {/* Empty state */}
      {messages.length === 0 && !loading && (

        <div
          className="
            h-full
            flex
            flex-col
            items-center
            justify-center
            text-center
            px-4
          "
        >

          <div
            className="
              text-6xl
              mb-5
            "
          >
            📱
          </div>

          <h2
            className="
              text-2xl
              font-semibold
              text-white
              mb-2
            "
          >
            Samsung AI Assistant
          </h2>

          <p
            className="
              text-gray-400
              max-w-md
              leading-relaxed
            "
          >
            Ask about Galaxy phones,
            foldables, camera specs,
            battery life, comparisons,
            pricing, or recommendations.
          </p>

        </div>
      )}

      {/* Messages */}
      <div className="space-y-5">

        {messages.map((msg, index) => (

          <MessageBubble

            key={`${msg.role}-${index}-${msg.content.slice(0, 20)}`}

            role={msg.role}

            content={msg.content}

          />

        ))}

        
        {loading && <TypingIndicator />}

        
        <div ref={bottomRef} />

      </div>

    </div>
  );
}