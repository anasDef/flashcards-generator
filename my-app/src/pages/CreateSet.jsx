// EDITED BY CODEX
import { useParams, Link, useNavigate } from "react-router";
import { useState, useContext, useEffect } from "react";
import { FlashcardsContext } from "../context/FlashcardsContext";
import { FiArrowLeft } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import ManualMode from "../components/ManualMode";
import AiMode from "../components/AiMode";
import "./CreateSet.css";

// Config array defining inputs for the flashcard set meta details (Title & Description)
const createSetHeaderFields = [
  {
    id: "title",
    label: "عنوان المجموعة",
    placeholder: "مثل، علم الأحياء 101: تركيب الخلية",
    type: "input",
  },
  {
    id: "description",
    label: "الوصف (اختياري)",
    placeholder: "عن ماذا تتحدث هذه المجموعة؟",
    type: "textarea",
  },
];

/**
 * CreateSet Component
 * Manages the creation of a new flashcards set or the updating/editing of an existing one.
 * Includes interactive tab navigation for Manual and AI editing modes.
 */
export default function CreateSet() {
  const { setId } = useParams();
  // Initialize navigation hook for page redirects
  const navigate = useNavigate();

  const {
    currentSet,
    cardsSets,
    handleCurrentSetChange,
    handleSpecificCurrentSetChange,
    handleAddSetClick,
    handleEditSetClick,
  } = useContext(FlashcardsContext);

  // State to manage active editor tab mode ("manual" or "ai")
  const [mode, setMode] = useState("manual");

  // State indicating if we are in "Edit Mode" (existing set) vs "Create Mode" (new set)
  const [isEdit, setIsEdit] = useState(false);

  // ===== HANDLERS =====
  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  // Saves modified set changes by dispatching update action and redirecting to dashboard
  const handleSaveEditClick = (set) => {
    handleEditSetClick(set);
    navigate("/");
  };

  // Syncs current set metadata and mode if editing an existing set ID
  useEffect(() => {
    if (setId !== "new") {
      const existingSet = cardsSets.find((set) => set.id == setId);
      if (existingSet) {
        setIsEdit(true);
        handleCurrentSetChange(existingSet);
      }
    }
  }, [setId, cardsSets]);

  return (
    <main className="create-set">
      <div className="container create-set__container">

        {/* Component Header containing navigation and metadata inputs */}
        <header className="create-set__header">
          <div className="create-set__header-fields">
            <h1 className="create-set__title">إنشاء مجموعة جديدة</h1>

            {/* Iterates and renders metadata input fields */}
            {createSetHeaderFields.map((field) => (
              <section className="create-set__field" key={field.id}>
                <label className="create-set__field-label" htmlFor={field.id}>
                  {field.label}
                </label>

                {field.type === "input" ? (
                  <input
                    className="create-set__field-input"
                    type="text"
                    placeholder={field.placeholder}
                    value={currentSet.title}
                    id={field.id}
                    onChange={(e) =>
                      handleSpecificCurrentSetChange("title", e.target.value)
                    }
                  />
                ) : (
                  <textarea
                    id={field.id}
                    className="create-set__field-input create-set__field-input--textarea"
                    placeholder={field.placeholder}
                    value={currentSet.description}
                    onChange={(e) =>
                      handleSpecificCurrentSetChange(
                        "description",
                        e.target.value,
                      )
                    }
                  />
                )}
              </section>
            ))}
          </div>
        </header>

        {/* Card editor workspace section */}
        <main className="create-set__create-cards">

          {/* Editor tab switches */}
          <header className="create-set__switch-buttons">
            <button
              value="manual"
              className={`create-set__switch-button ${mode === "manual" ? "create-set__switch-button--active" : ""}`}
              onClick={(e) => setMode(e.currentTarget.value)}
            >
              <FaPencilAlt aria-hidden="true" />
              الوضع اليدوي
            </button>
            <button
              value="ai"
              className={`create-set__switch-button ${mode === "ai" ? "create-set__switch-button--active" : ""}`}
              onClick={(e) => setMode(e.currentTarget.value)}
            >
              <BsStars aria-hidden="true" />
              وضع الذكاء الاصطناعي
            </button>
          </header>

          {/* Render selected editor component tab */}
          {mode === "manual" ? <ManualMode /> : <AiMode handleModeChange={handleModeChange} />}
        </main>

        {/* Footer actions for saving set data */}
        <footer className="create-set__footer">
          <button
            className="create-set__save-button button"
            onClick={() => {
              if (isEdit) {
                handleSaveEditClick(currentSet);
              } else {
                handleAddSetClick(currentSet);
                navigate("/");
              }
            }}
          >
            <FaRegSave aria-hidden="true" />
            {isEdit ? "حفظ التعديلات" : "حفظ المجموعة"}
          </button>
        </footer>
      </div>
    </main>
  );
}
