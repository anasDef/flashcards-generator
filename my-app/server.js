import express from "express";
import cors from "cors";
import { YoutubeTranscript } from "youtube-transcript";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/transcript", async (req, res) => {
    try {
        const { videoUrl } = req.query;
        if (!videoUrl) return res.status(400).json({ error: "videoUrl is required" });

        const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
        const fullText = transcript.map((t) => t.text).join(" ");

        res.json({ transcript: fullText });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3001, () => console.log("✅ Server running on port 3001"));