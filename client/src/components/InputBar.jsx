// FILE: client/src/components/InputBar.jsx
// ONE JOB: Let the user type a message and submit it. Call onSend(text) when they do.
// It has LOCAL state for the draft text — App never knows what's being typed, only the final message.

import { useState } from "react";

// Receives two props:
//   onSend  — function to call with the message text when user submits
//   loading — boolean — disables input and button while waiting for LLM response
export default function InputBar({ onSend, loading }) {
  // text: the current value of the textarea — local to this component
  // App doesn't need to know about it until the user actually sends
  const [text, setText] = useState("");

  function handleSubmit() {
    if (!text.trim() || loading) return; // guard: don't send empty messages or while loading
    onSend(text);   // call the function passed from App with the message content
    setText("");    // clear the input after sending
  }

  function handleKeyDown(e) {
    // Submit on Enter — but NOT when Shift+Enter (that should insert a newline)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent the default newline insertion in the textarea
      handleSubmit();
    }
  }

  return (
    // Sticky bottom bar with a top border to separate from the chat
    <div className="border-t border-gray-800 bg-gray-900 px-4 py-4">
      <div className="flex items-end gap-3 max-w-4xl mx-auto">

        {/* Textarea — grows with content up to 5 lines */}
        <textarea
          className="
            flex-1               /* takes all available width, leaving room for the button */
            resize-none          /* disables the manual drag-to-resize handle */
            bg-gray-800          /* dark input background */
            text-white           /* white text */
            rounded-xl           /* rounded corners */
            px-4 py-3            /* internal padding */
            text-sm              /* consistent text size */
            outline-none         /* remove default browser focus ring */
            focus:ring-2 focus:ring-blue-500  /* custom focus ring in Samsung blue */
            placeholder-gray-500 /* muted placeholder color */
            max-h-40             /* max height ~5 lines before scrolling */
            overflow-y-auto      /* scroll inside the textarea when content exceeds max-h */
            disabled:opacity-50  /* visually dim when disabled */
          "
          placeholder="Ask about Samsung phones..."
          value={text}                          // controlled input — React owns the value
          onChange={(e) => setText(e.target.value)} // update state on every keystroke
          onKeyDown={handleKeyDown}             // handle Enter key
          disabled={loading}                    // prevent typing while LLM is responding
          rows={1}                              // starts as a single line, grows via CSS
        />

        {/* Send button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()} // disabled if loading OR if input is empty
          className="
            bg-blue-600          /* Samsung blue */
            hover:bg-blue-500    /* slightly lighter on hover */
            disabled:opacity-40  /* dim when disabled */
            disabled:cursor-not-allowed /* cursor feedback when disabled */
            text-white
            rounded-xl
            px-4 py-3
            text-sm font-medium
            transition-colors    /* smooth color on hover */
            whitespace-nowrap    /* prevent button text from wrapping */
            shrink-0        /* don't let the button shrink when textarea is wide */
          "
        >
          {loading ? "..." : "Send"} {/* show "..." while loading so user knows it's working */}
        </button>
      </div>

      {/* Helper text below the input */}
      <p className="text-xs text-gray-600 text-center mt-2">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}