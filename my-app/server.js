import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { YoutubeTranscript } from "youtube-transcript";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
// ── Transcript Route ────────────────────────────────────────────────────────
app.get("/api/transcript", async (req, res) => {
  try {
    const { videoUrl } = req.query;
    if (!videoUrl)
      return res.status(400).json({ error: "videoUrl is required" });

    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
    const fullText = transcript.map((t) => t.text).join(" ");

    res.json({ transcript: fullText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ── Google Gemini 1.5 Flash Proxy Route ──────────────────────────────────
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/generate-flashcards", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "prompt is required" });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // ✅ أحدث موديل من المقال
      contents: prompt,
      config: {
        responseMimeType: "application/json", // ✅ بيضمن JSON نقي
        temperature: 0.2,
      },
    });

    const text = response.text;
    const parsed = JSON.parse(text);

    // نفس الهيكل اللي groqFunctions.js بيتوقعه
    res.json({
      choices: [{ message: { content: JSON.stringify(parsed) } }],
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: error.message });
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});