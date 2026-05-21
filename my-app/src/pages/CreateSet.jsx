import { useParams, Link } from "react-router";
import { useState, useContext, useEffect } from "react";
import { FlashcardsContext } from "../context/FlashcardsContext";
import { FiArrowLeft } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import ManualMode from "../components/ManualMode";
import "./CreateSet.css";

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

export default function CreateSet() {
  const { setId } = useParams();
  const {
    currentSet,
    cardsSets,
    handleCurrentSetChange,
    handleSpecificCurrentSetChange,
    handleDeleteSetClick,
    handleAddSetClick,
  } = useContext(FlashcardsContext);

  // states
  const [mode, setMode] = useState("manual");
  const [isEdit, setIsEdit] = useState(false);

  // ===== HANDLERS =====
  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const handleSaveEditClick = (set) => {
    const editSet = { ...set };
    const newSet = set.splice(cardsSets.findIndex((card) => card.id == setId), 1, editSet);
    handleAddSetClick(newSet)
  };

  // check if the user clicked on edit set button
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
        <header className="create-set__header">
          <nav
            className="create-set__header-nav"
            aria-label="العودة للصفحة الرئيسية"
          >
            <Link className="create-set__back-button button" to="/">
              <FiArrowLeft aria-hidden="true" />
            </Link>
          </nav>

          <div className="create-set__header-fields">
            <h1 className="create-set__title">إنشاء مجموعة جديدة</h1>
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

        <main className="create-set__create-cards">
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

          {mode === "manual" ? <ManualMode /> : "AI Mode"}
        </main>

        <footer className="create-set__footer">
          <button
            className="create-set__save-button button"
            onClick={() => {
              if (isEdit) handleSaveEditClick(currentSet);
              else handleAddSetClick(currentSet);
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
