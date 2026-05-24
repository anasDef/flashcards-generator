// EDITED BY CODEX
// These edits for you comment (codex)
import { useState, useContext } from "react";
import { BsStars } from "react-icons/bs";
import { FiFileText, FiLink, FiUploadCloud, FiPlus, FiX } from "react-icons/fi";
import { FlashcardsContext } from "../context/FlashcardsContext";
import { generateFlashcardsFromAi } from "../utility/generateFlashcards";
import FlashcardLoader from "./FlashcardLoader";
import ErrorMsg from "./ErrorMsg"
import "./AiMode.css";

const MAX_URLS = 5;

const aiModeSourceFields = [
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
        youtubeLinks: [""],
        // These edits for you comment (codex)
        contentFile: null,
        instructions: "",
    });

    const [errorStatus, setErrorStatus] = useState({
        title: "",
        description: "",
    });

    // ===== URL LIST HANDLERS ===== //
    const handleUrlChange = (index, value) => {
        setAiModeFields((prev) => {
            const updated = [...prev.youtubeLinks];
            updated[index] = value;
            return { ...prev, youtubeLinks: updated };
        });
    };

    const handleAddUrl = () => {
        setAiModeFields((prev) => {
            if (prev.youtubeLinks.length >= MAX_URLS) return prev;
            return { ...prev, youtubeLinks: [...prev.youtubeLinks, ""] };
        });
    };

    const handleRemoveUrl = (index) => {
        setAiModeFields((prev) => {
            const updated = prev.youtubeLinks.filter((_, i) => i !== index);
            return { ...prev, youtubeLinks: updated.length ? updated : [""] };
        });
    };

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
            const { youtubeLinks, contentFile, instructions } = aiModeFields;
            // Filter out empty inputs before passing them
            const filledLinks = youtubeLinks.filter((url) => url.trim() !== "");
            const aiFlashcards = await generateFlashcardsFromAi(filledLinks, contentFile, instructions);

            handleSpecificCurrentSetChange("cards", aiFlashcards);
            handleModeChange("manual");
        } catch (error) {
            console.error("Error generating flashcards:", error);

            setErrorStatus({
                title: err.title || "An Error Occurred",
                description: err.description || "Something went wrong. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const urlCount = aiModeFields.youtubeLinks.length;
    const canAddMore = urlCount < MAX_URLS;

    const hasYoutubeLink = aiModeFields.youtubeLinks.some((url) => url.trim() !== "");
    const hasContentFile = !!aiModeFields.contentFile;
    const isValidSource = hasYoutubeLink || hasContentFile;

    return (
        <>
            {isLoading && <FlashcardLoader />}
            <section className="ai-mode" aria-labelledby="ai-mode-title">
                <h2 className="ai-mode__title" id="ai-mode-title">
                    مصدر المحتوى
                </h2>

                <div className="ai-mode__source-fields">
                    {/* ── Dynamic YouTube URL inputs ── */}
                    <div className="ai-mode__field ai-mode__field--urls">
                        <div className="ai-mode__field-header">
                            <span className="ai-mode__label">رابط يوتيوب</span>
                            <div className="ai-mode__url-header-actions">
                                <span className="ai-mode__url-counter" aria-live="polite">
                                    {urlCount} / {MAX_URLS}
                                </span>
                                {canAddMore && (
                                    <button
                                        className="ai-mode__url-add"
                                        type="button"
                                        disabled={isLoading}
                                        onClick={handleAddUrl}
                                    >
                                        <FiPlus aria-hidden="true" />
                                        أضف رابطاً آخر
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="ai-mode__url-list">
                            {aiModeFields.youtubeLinks.map((url, index) => (
                                <div className="ai-mode__url-row" key={index}>
                                    <span className="ai-mode__control ai-mode__control--url">
                                        <input
                                            className="ai-mode__control-field"
                                            id={index === 0 ? "ai-youtube-link" : `ai-youtube-link-${index}`}
                                            type="url"
                                            placeholder="https://youtube.com/watch?v=..."
                                            value={url}
                                            disabled={isLoading}
                                            onChange={(e) => handleUrlChange(index, e.target.value)}
                                            aria-label={`رابط يوتيوب ${index + 1}`}
                                        />
                                        <FiLink aria-hidden="true" />
                                    </span>

                                    {/* Show remove button for every row when there are multiple */}
                                    {urlCount > 1 && (
                                        <button
                                            className="ai-mode__url-remove"
                                            type="button"
                                            aria-label={`حذف الرابط ${index + 1}`}
                                            disabled={isLoading}
                                            onClick={() => handleRemoveUrl(index)}
                                        >
                                            <FiX aria-hidden="true" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── File upload field (unchanged) ── */}
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
                    className={`button ai-mode__generate-button ${isValidSource ? "" : "disabled"}`}
                    type="button"
                    disabled={isLoading || !isValidSource}
                    onClick={() => { handleGenerateClick(); }}
                >
                    <BsStars aria-hidden="true" />
                    توليد البطاقات التعليمية
                </button>

                <ErrorMsg title={errorStatus.title} description={errorStatus.description} />
            </section>
        </>
    );
}
