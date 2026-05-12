// FILE: client/src/App.jsx
// ONE JOB: Own all state. Coordinate between InputBar (user input) and ChatWindow (display).
// Zero display logic lives here — App is the brain, the children are the face.

import { useState } from "react";
import ChatWindow from "./components/ChatWindow.jsx";
import InputBar from "./components/InputBar.jsx";
import { sendMessage } from "./api/chatService.js";

export default function App() {
  // messages: the full conversation history — array of { role: "user"|"assistant", content: "..." }
  // Every message ever sent or received lives in this one array.
  const [messages, setMessages] = useState([]);

  // loading: true while we're waiting for the LLM to respond
  // Used to show the typing indicator and disable the input
  const [loading, setLoading] = useState(false);

  // error: holds an error string if the API call fails, null otherwise
  const [error, setError] = useState(null);

  // handleSend is called by InputBar when the user submits a message
  async function handleSend(text) {
    if (!text.trim()) return; // ignore empty or whitespace-only submissions

    // Build the new user message object
    const userMessage = { role: "user", content: text };

    // Add the user's message to state immediately — don't wait for the LLM
    // updatedMessages is a local variable so we can pass the full history to the API
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages); // triggers a re-render — user sees their message right away

    setLoading(true);  // show the typing indicator
    setError(null);    // clear any previous error

    try {
      // sendMessage sends the FULL conversation history — LLM needs context to reply coherently
      const reply = await sendMessage(updatedMessages);

      // Add the assistant's reply to state — triggers another re-render
      setMessages([...updatedMessages, { role: "assistant", content: reply }]);
    } catch {
      setError("Failed to get a response. Is the server running?");
    } finally {
      setLoading(false); // always stop loading, whether success or failure
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

    {/* Main Chat Card */}
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

      {/* Header */}
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

        {/* Status Dot */}
        <div
          className="
            w-3
            h-3
            rounded-full
            bg-blue-500
          "
        />

        {/* Title */}
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

      {/* Error Banner */}
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

      {/* Chat Area */}
      <ChatWindow
        messages={messages}
        loading={loading}
      />

      {/* Input */}
      <InputBar
        onSend={handleSend}
        loading={loading}
      />

    </div>

  </div>

);
}