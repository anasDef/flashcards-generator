/* EDITED BY CODEX */
import { useContext } from "react";
import { FlashcardsContext } from "../context/FlashcardsContext";
import { MdAddCircleOutline, MdDeleteOutline } from "react-icons/md";
import "./ManualMode.css";

export default function ManualMode() {
  const { currentSet, handleSpecificCurrentSetChange } =
    useContext(FlashcardsContext);

  const cards = Array.isArray(currentSet?.cards) ? currentSet.cards : [];

  // Updates one property on the selected card, then syncs the full cards array back to context.
  const handleCardInputChange = (cardId, key, value) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, [key]: value } : card,
    );

    handleSpecificCurrentSetChange("cards", updatedCards);
  };

  // Appends a blank card using the schema expected by the flashcards context.
  const handleAddCardClick = () => {
    const newCard = {
      id: Date.now(),
      front: "",
      back: "",
      isUnderstood: false,
    };

    handleSpecificCurrentSetChange("cards", [...cards, newCard]);
  };

  // Removes the clicked card by id and stores the filtered cards array in context.
  const handleDeleteCardClick = (cardId) => {
    const updatedCards = cards.filter((card) => card.id !== cardId);

    handleSpecificCurrentSetChange("cards", updatedCards);
  };

  return (
    <section className="manual-mode" aria-label="إضافة البطاقات يدويًا">
      <div className="manual-mode__cards">
        {cards.length > 0
          ? cards.map((card, index) => (
            <article className="manual-mode__card" key={card.id}>
              <span className="manual-mode__card-number" aria-hidden="true">
                {index + 1}
              </span>

              <button
                className="manual-mode__delete-button"
                type="button"
                aria-label={`حذف بطاقة ${index + 1}`}
                onClick={() => handleDeleteCardClick(card.id)}
              >
                <MdDeleteOutline aria-hidden="true" />
              </button>

              <div className="manual-mode__fields">
                <label
                  className="manual-mode__field"
                  htmlFor={`manual-card-front-${card.id}`}
                >
                  <span className="manual-mode__label">الوجه (السؤال)</span>
                  <input
                    className="manual-mode__input"
                    id={`manual-card-front-${card.id}`}
                    type="text"
                    value={card.front ?? ""}
                    placeholder="مصطلح أو مفهوم..."
                    onChange={(e) =>
                      handleCardInputChange(card.id, "front", e.target.value)
                    }
                  />
                </label>

                <label
                  className="manual-mode__field"
                  htmlFor={`manual-card-back-${card.id}`}
                >
                  <span className="manual-mode__label">الظهر (الإجابة)</span>
                  <input
                    className="manual-mode__input"
                    id={`manual-card-back-${card.id}`}
                    type="text"
                    value={card.back ?? ""}
                    placeholder="تعريف أو شرح..."
                    onChange={(e) =>
                      handleCardInputChange(card.id, "back", e.target.value)
                    }
                  />
                </label>
              </div>
            </article>
          ))
          : null}
      </div>

      <button
        className="manual-mode__add-button"
        type="button"
        onClick={handleAddCardClick}
      >
        <MdAddCircleOutline aria-hidden="true" />
        إضافة بطاقة أخرى
      </button>
    </section>
  );
}
