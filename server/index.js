// FILE: server/src/index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

import systemPrompt from "./systemPrompt.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

// Groq client
const client = new OpenAI({

  apiKey: process.env.GROQ_API_KEY,

  baseURL: "https://api.groq.com/openai/v1",

});

// Fast + stable free model
const MODEL = "llama-3.3-70b-versatile";

app.use(cors());

app.use(express.json());

// Health route
app.get("/", (req, res) => {

  res.json({
    status: "ok",
  });

});

// Chat route
app.post("/api/chat", async (req, res) => {

  try {

    const { messages } = req.body;

    // Validation
    if (!Array.isArray(messages)) {

      return res.status(400).json({
        error: "messages must be an array",
      });

    }

    // Clean messages
    const cleanedMessages = messages
      .filter(
        (m) =>
          m &&
          typeof m.role === "string" &&
          typeof m.content === "string"
      )
      .slice(-6);

    // Final formatted messages
    const formattedMessages = [

      {
        role: "system",
        content: systemPrompt,
      },

      ...cleanedMessages,

    ];

    let completion;

    // Retry logic
    for (let attempt = 1; attempt <= 3; attempt++) {

      try {

        completion =
          await client.chat.completions.create({

            model: MODEL,

            messages: formattedMessages,

            temperature: 0.7,

            max_tokens: 300,

          });

        break;

      } catch (err) {

        console.log(
          `Attempt ${attempt} failed`
        );

        // Retry only on temporary errors
        if (
          err.status !== 429 &&
          err.status !== 500 &&
          err.status !== 503
        ) {

          throw err;

        }

        // Final retry failed
        if (attempt === 3) {

          throw err;

        }

        // Wait before retry
        await new Promise((resolve) =>
          setTimeout(resolve, 2000)
        );
      }
    }

    const reply =
      completion?.choices?.[0]?.message?.content;

    if (!reply) {

      throw new Error(
        "Empty AI response"
      );

    }

    // Send reply
    res.json({
      reply,
    });

  } catch (error) {

    console.error(
      "Chat route error:",
      error
    );

    res.status(500).json({

      error:
        error?.message ||
        "Internal server error",

    });
  }
});

// Start server
app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

});