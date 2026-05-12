// FILE: client/src/api/chatService.js
// ONE JOB:
// Send chat messages to backend API
// and return ONLY the reply string.
//
// App.jsx should never care about:
// - backend URLs
// - headers
// - fetch details
// - response shape
//
// All networking logic stays isolated here.

// Frontend env variables MUST start with VITE_
// Example in client/.env:
//
// VITE_API_URL=http://localhost:3001
//
// Production example:
// VITE_API_URL=https://api.yourdomain.com
//
const API_URL = import.meta.env.VITE_API_URL;

// messages = [
//   { role: "user", content: "Hi" },
//   { role: "assistant", content: "Hello" }
// ]
export async function sendMessage(messages) {

  // Basic validation
  if (!Array.isArray(messages)) {
    throw new Error("messages must be an array");
  }

  // POST request to backend
  const response = await fetch(
    `${API_URL}/api/chat`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      // Convert JS object → JSON string
      body: JSON.stringify({
        messages,
      }),
    }
  );

  // Handle non-2xx responses
  if (!response.ok) {

    let errorMessage =
      `Server error: ${response.status}`;

    try {

      // Attempt to extract backend error message
      const errorData = await response.json();

      if (errorData?.error) {
        errorMessage = errorData.error;
      }

    } catch {
      // Ignore JSON parsing failure
    }

    throw new Error(errorMessage);
  }

  // Parse JSON response body
  const data = await response.json();

  // Defensive validation
  if (!data?.reply) {
    throw new Error(
      "Invalid server response: missing reply"
    );
  }

  // Return ONLY the reply string
  return data.reply;
}