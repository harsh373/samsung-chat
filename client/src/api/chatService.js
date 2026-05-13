const API_URL = import.meta.env.VITE_API_URL;

export async function sendMessage(messages) {

  try {

    if (!Array.isArray(messages)) {
      throw new Error("messages must be an array");
    }

    const response = await fetch(
      `${API_URL}/api/chat`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          messages,
        }),
      }
    );

    if (!response.ok) {

      let errorMessage =
        `Server error: ${response.status}`;

      try {

        const errorData = await response.json();

        if (errorData?.error) {
          errorMessage = errorData.error;
        }

      } catch {
        // Ignore JSON parsing failure
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!data?.reply) {
      throw new Error(
        "Invalid server response: missing reply"
      );
    }

    return data.reply;

  } catch (error) {

    console.error("sendMessage failed:", error);

    throw error;
  }
}