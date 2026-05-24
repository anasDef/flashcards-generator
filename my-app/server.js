import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { YoutubeTranscript } from "youtube-transcript";

const app = express();
// Enable CORS for all origins and JSON body parsing up to 10mb
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// -----------------------------------------------------
//  Transcript endpoint
// -----------------------------------------------------
// Retrieves full transcript text for a given YouTube video URL.
app.get("/api/transcript", async (req, res) => {
  try {
    const { videoUrl } = req.query;
    if (!videoUrl) return res.status(400).json({ error: "videoUrl is required" });

    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
    const fullText = transcript.map(t => t.text).join(" ");
    res.json({ transcript: fullText });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------------------------------
//  Gemini proxy endpoint
// -----------------------------------------------------
// Forwards a prompt to the Gemini model and returns the parsed JSON response.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/generate-flashcards", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "prompt is required" });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const parsed = JSON.parse(response.text);
    res.json({ choices: [{ message: { content: JSON.stringify(parsed) } }] });
  } catch (error) {
    console.error("Gemini Error:", error);
    // Detect rate‑limit errors and surface a 429 status for the frontend
    const isRateLimit = error.status === 429 || error.message?.includes("429") || error.message?.includes("RESOURCE_EXHAUSTED");
    if (isRateLimit) {
      return res.status(429).json({ error: "Rate limit exceeded from Gemini API." });
    }
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));