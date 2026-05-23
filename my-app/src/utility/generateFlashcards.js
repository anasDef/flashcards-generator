import { fetchYoutubeTranscript } from "./youtube";

/**
 * Generates flashcards by sending the prompt to our Express server,
 * which forwards it to Groq using the API key stored server-side.
 * @param {string} youtubeLink - The YouTube video URL provided by the user.
 * @param {File|null} contentFile - The actual File object uploaded via the input field.
 * @param {string} instructions - Optional custom instructions to guide the AI generation.
 * @returns {Promise<Array>} - A promise that resolves to an array of customized flashcards.
 */
export async function generateFlashcardsFromAi(
  youtubeLink,
  contentFile,
  instructions,
) {
  try {
    let youtubeContextText = "";

    // 1️⃣ Try to extract the live transcript if a YouTube link is provided
    if (youtubeLink?.trim()) {
      youtubeContextText = await fetchYoutubeTranscript(youtubeLink);
    }

    // 2️⃣ Construct the master educational prompt
    let basePrompt = `
            You are an expert educational assistant specialized in summarizing materials and creating flashcards.
            Your task is to analyze the provided content thoroughly and generate a comprehensive set of study flashcards.
      
            Flashcard Structuring Rules:
            - Each flashcard must strictly consist of a "front" (question, concept, or term) and a "back" (accurate answer or concise explanation).
            - The "back" of each flashcard must be brief, short, and use a maximum of 20 words.
            - Ensure a diverse range of questions (e.g., definitions, wh-questions, conceptual checks).
            - use arabic language except for the english definitions use engilsh, as default if user does not specify language.
        `;

    // Inject YouTube transcript data OR fallback to URL context if transcript failed
    if (youtubeLink?.trim()) {
      if (youtubeContextText) {
        basePrompt += `\n[SOURCE 1: YOUTUBE VIDEO TRANSCRIPT]\n"${youtubeContextText}"\n`;
      } else {
        basePrompt += `\n[SOURCE 1: YOUTUBE URL REFERENCE]\nLink: ${youtubeLink}\nAnalyze this specific video URL context and its topic metadata using your internal knowledge baseline.\n`;
      }
    }

    // 3️⃣ Process the uploaded file if present and append its content to the prompt
    if (contentFile) {
      const fileType = contentFile.type;

      if (fileType.startsWith("image/")) {
        basePrompt += `\n[NOTE]: An image file was uploaded but Groq text models cannot process images directly. Please use a text-based file instead.\n`;
      } else {
        // Text-based files (TXT, MD, CSV, DOCX, PDF-text, etc.) → read as plain text
        const textContent = await contentFile.text();
        basePrompt += `\n[UPLOADED FILE CONTENT]\n${textContent}\n`;
      }
    }

    // Append custom user instructions if they exist
    if (instructions?.trim()) {
      basePrompt += `\n[USER CUSTOM INSTRUCTIONS - PRIORITY]\nStrictly follow these rules: "${instructions}"\n`;
    }

    // Enforce strict raw JSON output formatting
    basePrompt += `
            CRITICAL REQUIREMENT: Return a JSON object with a "flashcards" array. Do NOT include any introductory text, markdown formatting, or code blocks.
            Required JSON Schema:
            {
                "flashcards": [
                    {"front": "Question or term goes here?", "back": "Answer or explanation goes here."},
                    {"front": "Another concept", "back": "Its corresponding definition."}
                ]
            }
        `;

    const response = await fetch(
      "https://flashcards-generator-sbvg.onrender.com/api/generate-flashcards",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: basePrompt }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Server Error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    // 5️⃣ Extract the response text
    const responseText = data.choices[0].message.content;

    // 6️⃣ Parse the JSON
    const parsed = JSON.parse(responseText);
    const rawCards = parsed.flashcards;

    if (!Array.isArray(rawCards)) {
      throw new Error("Unexpected response format from Groq API");
    }

    // 7️⃣ Structure the final payload
    const structuredFlashcards = rawCards.map((card, index) => ({
      id: `ai-card-${Date.now()}-${index}`,
      front: card.front,
      back: card.back,
      isUnderstood: false,
    }));

    return structuredFlashcards;
  } catch (error) {
    // error component put it here
    console.error("Error generating flashcards:", error);
    throw error;
  }
}
