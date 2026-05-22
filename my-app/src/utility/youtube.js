export async function fetchYoutubeTranscript(url) {
    try {
        const response = await fetch(
            `http://localhost:3001/api/transcript?videoUrl=${encodeURIComponent(url)}`
        );

        if (!response.ok) throw new Error("Server error");

        const data = await response.json();
        return data.transcript ?? "";

    } catch (error) {
        console.warn("Failed to fetch transcript:", error.message);
        return "";
    }
}