export async function fetchYoutubeTranscript(url) {
    try {
        const response = await fetch(
            `https://flashcards-generator-7ego.onrender.com/api/transcript?videoUrl=${encodeURIComponent(url)}`
        );

        if (!response.ok) throw new Error("Server error");

        const data = await response.json();
        return data.transcript ?? "";

    } catch (error) {
        throw {
            type: "YOUTUBE_ERROR",
            title: "Invalid YouTube URL",
            description: "One of the provided links is incorrect or lacks a transcript.",
        };
    }
}