// generateFlashcards.js – Core AI flashcard generation utility
// -----------------------------------------------------
// Imports
import { fetchYoutubeTranscript } from "./youtube";

/**
 * Generates flashcards by sending a constructed prompt to the backend server.
 *
 * @param {string[]|string} youtubeLinks - One or many YouTube URLs (up to 5).
 * @param {File|null} contentFile - Optional uploaded file (text based).
 * @param {string} instructions - Optional custom user instructions.
 * @returns {Promise<Array>} Array of flashcard objects.
 */
export async function generateFlashcardsFromAi(youtubeLinks, contentFile, instructions) {
  try {
    // ---------- Normalise input ----------
    const linksArray = Array.isArray(youtubeLinks)
      ? youtubeLinks.filter((url) => url?.trim())
      : youtubeLinks?.trim()
        ? [youtubeLinks]
        : [];

    // ---------- Fetch transcripts ----------
    const transcriptResults = [];
    try {
      for (const link of linksArray) {
        const transcript = await fetchYoutubeTranscript(link);
        transcriptResults.push({ link, transcript });
      }
    } catch (ytError) {
      // Propagate a structured error for the UI
      throw ytError
    }

    // ---------- Build prompt ----------
    let basePrompt = `
      You are an expert educational assistant specialized in creating study flashcards.
      Analyze the provided material and generate comprehensive flashcards that maximize retention.
      ## FLASHCARD RULES

      **Structure**
      - front: clear question, term, or prompt
      - back: precise answer — maximum 20 words, no filler

      **Question Types** (distribute evenly)
      - Definition | Cause & Effect | Comparison | Application | Fill-in-the-blank

      **Language**
      - Default: Arabic for all content
      - Exception: English technical terms and proper nouns stay in English
      - Switch fully if user specifies another language

      **Quality**
      - One concept per card only
      - Fronts must be self-contained (no "it" or "this" without context)
      - No vague, trivial, or repetitive card
      - Minimum 10 cards, scale up with content length.
      - Only extract information explicitly stated in the provided material.
      - If something is unclear or not mentioned, skip it — do not infer or invent.
      - Never generate cards about topics outside the given content.

      CRITICAL REQUIREMENT: Return a JSON object with a "flashcards" array. Do NOT include any introductory text, markdown formatting, or code blocks.
      Required JSON Schema:
        {
          "flashcards": [
            {"front": "Question or term goes here?", "back": "Answer or explanation goes here."},
            {"front": "Another concept", "back": "Its corresponding definition."}
          ]
        }
      `;

    // Add each transcript or URL fallback as a source block
    transcriptResults.forEach(({ link, transcript }, idx) => {
      const sourceNum = idx + 1;
      if (transcript) {
        basePrompt += `\n[SOURCE ${sourceNum}: YOUTUBE VIDEO TRANSCRIPT]\n${transcript}\n`;
      } else {
        basePrompt += `\n[SOURCE ${sourceNum}: YOUTUBE URL REFERENCE]\nLink: ${link}\n`;
      }
    });

    // Append uploaded file content if present
    if (contentFile) {
      if (contentFile.type.startsWith("image/")) {
        basePrompt += `\n[NOTE]: An image file was uploaded but Groq text models cannot process images directly. Please use a text-based file instead.\n`;
      } else {
        const textContent = await contentFile.text();
        basePrompt += `\n[UPLOADED FILE CONTENT]\n${textContent}\n`;
      }
    }

    // Append custom user instructions
    if (instructions?.trim()) {
      basePrompt += `\n[USER CUSTOM INSTRUCTIONS - PRIORITY]\nStrictly follow these rules: "${instructions}"\n`;
    }

    // ---------- Send request to backend ----------
    const response = await fetch(
      "https://flashcards-generator-7ego.onrender.com/api/generate-flashcards",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: basePrompt }),
      }
    );

    if (!response.ok) {
      // Convert a 429 rate‑limit response into a structured error
      if (response.status === 429) {
        throw {
          type: "RATE_LIMIT",
          title: "Limit Exceeded",
          description: "You have reached your daily request limit. Please try again tomorrow.",
        };
      }
      const errorData = await response.json();
      throw new Error(`Server Error: ${JSON.stringify(errorData)}`);
    }

    // ---------- Parse backend response ----------
    const data = await response.json();
    const responseText = data.choices[0].message.content;
    const parsed = JSON.parse(responseText);
    const rawCards = parsed.flashcards;

    // Transform raw cards into UI‑friendly objects
    const structuredFlashcards = rawCards.map((card, index) => ({
      id: `ai-card-${Date.now()}-${index}`,
      front: card.front,
      back: card.back,
      isUnderstood: false,
    }));

    return structuredFlashcards;
  } catch (error) {
    // Propagate already‑structured UI errors
    if (error.type || (error.title && error.description)) {
      throw error;
    }

    // Network or unexpected errors
    if (!navigator.onLine || error.message?.includes("fetch")) {
      throw {
        type: "NETWORK_ERROR",
        title: "Connection Failed",
        description: "Unable to reach the server. Check your internet connection.",
      };
    }

    // Fallback generic error
    throw {
      type: "UNKNOWN_ERROR",
      title: "Generation Failed",
      description: "An unexpected error occurred while creating flashcards.",
    };
  }
}

