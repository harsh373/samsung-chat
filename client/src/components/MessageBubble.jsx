// FILE: client/src/components/MessageBubble.jsx
// ONE JOB: Render a single message with correct alignment and color based on who sent it.
// "user" messages → right-aligned blue. "assistant" messages → left-aligned gray.
// To add timestamps, copy buttons, or avatars — you touch ONLY this file.

// Receives two props:
//   role    — "user" or "assistant"
//   content — the message text string
export default function MessageBubble({ role, content }) {
  const isUser = role === "user"; // boolean — drives all the conditional styling below

  return (
    // Outer div controls horizontal alignment: justify-end pushes bubble right for user
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

      {/* The bubble itself */}
      <div
        className={`
          max-w-[75%]        /* never wider than 75% of the container */
          rounded-2xl        /* fully corners */
          px-4 py-3          /* horizontal and vertical padding inside the bubble */
          text-sm            /* consistent text size */
          leading-relaxed    /* comfortable line height for reading */
          whitespace-pre-wrap /* preserves newlines in the LLM's response */
          ${isUser
            ? "bg-blue-600 text-white rounded-br-sm"    /* user: Samsung blue, sharp bottom-right corner */
            : "bg-gray-800 text-gray-100 rounded-bl-sm" /* assistant: dark gray, sharp bottom-left corner */
          }
        `}
      >
        {content}
      </div>
    </div>
  );
}