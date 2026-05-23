// EDITED BY CODEX
// These edits for you comment (codex)
import { useState, useContext } from "react";
import { BsStars } from "react-icons/bs";
import { FiFileText, FiLink, FiUploadCloud } from "react-icons/fi";
import { FlashcardsContext } from "../context/FlashcardsContext";
import { generateFlashcardsFromAi } from "../utility/generateFlashcards";
import FlashcardLoader from "./FlashcardLoader";
import "./AiMode.css";

const aiModeSourceFields = [
    {
        id: "ai-youtube-link",
        key: "youtubeLink",
        label: "رابط يوتيوب",
        placeholder: "https://youtube.com/watch?v=...",
        type: "url",
        icon: <FiLink aria-hidden="true" />,
    },
    {
        id: "ai-content-file",
        key: "contentFile",
        label: "ارفع ملفك (PDF, DOCX, TXT, MD, CSV)",
        placeholder: "اختر أو اسحب الملف",
        type: "file",
        icon: <FiFileText aria-hidden="true" />,
    },
];

export default function AiMode({ handleModeChange }) {
    // These edits for you comment (codex)
    const { handleSpecificCurrentSetChange } = useContext(FlashcardsContext);
    const [isLoading, setIsLoading] = useState(false);
    const [aiModeFields, setAiModeFields] = useState({
        youtubeLink: "",
        // These edits for you comment (codex)
        contentFile: null,
        instructions: "",
    });

    // ===== HANDLERS ===== //
    const handleFieldChange = (key, value) => {
        setAiModeFields((prevFields) => ({
            ...prevFields,
            [key]: value,
        }));
    };

    const handleGenerateClick = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const { youtubeLink, contentFile, instructions } = aiModeFields;
            const aiFlashcards = await generateFlashcardsFromAi(youtubeLink, contentFile, instructions);

            handleSpecificCurrentSetChange("cards", aiFlashcards);
            handleModeChange("manual");
        } catch (error) {
            console.error("Error generating flashcards:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading && <FlashcardLoader />}
            <section className="ai-mode" aria-labelledby="ai-mode-title">
                <h2 className="ai-mode__title" id="ai-mode-title">
                    مصدر المحتوى
                </h2>

                <div className="ai-mode__source-fields">
                    {aiModeSourceFields.map((field) => {
                        const isFileField = field.type === "file";
                        // These edits for you comment (codex)
                        const uploadedFile = aiModeFields[field.key];
                        const fileName = uploadedFile?.name ?? "";

                        return (
                            <label className="ai-mode__field" htmlFor={field.id} key={field.id}>
                                <span className="ai-mode__label">{field.label}</span>

                                {isFileField ? (
                                    <span
                                        // These edits for you comment (codex)
                                        className={`ai-mode__control ai-mode__control--file ${fileName ? "ai-mode__control--active" : ""
                                            }`}
                                    >
                                        <input
                                            className="ai-mode__native-file"
                                            id={field.id}
                                            type="file"
                                            accept=".pdf,.docx,.txt,.md"
                                            disabled={isLoading}
                                            onChange={(e) =>
                                                handleFieldChange(field.key, e.target.files[0] ?? null)
                                            }
                                        />
                                        <span className="ai-mode__control-value">
                                            {field.icon}
                                            {fileName || field.placeholder}
                                        </span>
                                        <FiUploadCloud className="ai-mode__control-icon" aria-hidden="true" />
                                    </span>
                                ) : (
                                    // These edits for you comment (codex)
                                    <span className="ai-mode__control">
                                        <input
                                            className="ai-mode__control-field"
                                            id={field.id}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            value={aiModeFields[field.key]}
                                            disabled={isLoading}
                                            onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                        />
                                        {field.icon}
                                    </span>
                                )}
                            </label>
                        );
                    })}
                </div>

                <label className="ai-mode__field ai-mode__field--instructions" htmlFor="ai-instructions">
                    <span className="ai-mode__optional-label">أمر مخصص (اختياري)</span>
                    <textarea
                        className="ai-mode__textarea"
                        id="ai-instructions"
                        placeholder="مثال: ركز على التعريفات والتواريخ الرئيسية..."
                        value={aiModeFields.instructions}
                        disabled={isLoading}
                        onChange={(e) => handleFieldChange("instructions", e.target.value)}
                    />
                </label>

                <button
                    className="ai-mode__generate-button"
                    type="button"
                    disabled={isLoading}
                    onClick={() => { handleGenerateClick() }}
                >
                    <BsStars aria-hidden="true" />
                    توليد البطاقات التعليمية
                </button>
            </section>
        </>
    );
}
