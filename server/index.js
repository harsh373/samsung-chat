import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

import systemPrompt from "./systemPrompt.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

// Groq
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Model 
const MODEL = "llama-3.3-70b-versatile";


app.use(cors());

app.use(express.json());


app.get("/", (req, res) => {

  res.json({
    status: "ok",
  });

});

// Chat route
app.post("/api/chat", async (req, res) => {

  try {

    const { messages } = req.body;

   
    if (!Array.isArray(messages)) {

      return res.status(400).json({
        error: "messages must be an array",
      });

    }

    
    const cleanedMessages = messages
      .filter(
        (m) =>
          m &&
          typeof m.role === "string" &&
          typeof m.content === "string"
      )
      .slice(-6);

    
    if (cleanedMessages.length === 0) {

      return res.status(400).json({
        error: "No valid messages provided",
      });

    }

   
    const formattedMessages = [

      {
        role: "system",
        content: systemPrompt,
      },

      ...cleanedMessages,

    ];

    let completion;

  
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

        
        if (
          err.status !== 429 &&  //rate limit
          err.status !== 500 &&  //sever error
          err.status !== 503     //sevice unavailable
        ) {

          throw err;

        }

       
        if (attempt === 3) {

          throw err;

        }

        
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


app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

});