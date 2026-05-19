import { Link } from "react-router";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaRegPlayCircle } from "react-icons/fa";
import "./Set.css";

// Helper function to translate performance status into Arabic text
const getToneLabel = (tone) => {
  switch (tone) {
    case "weak":
      return "تحتاج إلي مذاكرة";
    case "medium":
      return "جيد";
    case "strong":
      return "ممتاز";
    default:
      return "";
  }
};

// Component representing a single flashcard set card item
export default function FlashcardSetCard({ set, onDeleteSet }) {
  return (
    <article className="home__set-card">
      {/* Decorative corner indicator based on performance status */}
      <span
        className={`home__set-corner home__set-corner--${set.calculatedTone}-soft`}
        aria-hidden="true"
      />

      {/* Top action buttons (Edit, Delete) and source indicator */}
      <div className="home__set-top">
        <div className="home__set-buttons">
          <Link to={`/create-set/${set.id}`}>
            <button
              className="home__set-button home__set-button--edit"
              type="button"
              aria-label="تعديل المجموعة"
            >
              <MdEdit />
            </button>
          </Link>

          <button
            className="home__set-button home__set-button--delete"
            type="button"
            aria-label="حذف المجموعة"
            onClick={() => onDeleteSet(set.id)}
          >
            <MdDelete />
          </button>
        </div>

        <span className="home__set-source">{set.source}</span>
      </div>

      {/* Set Details */}
      <h3 className="home__set-title">{set.title}</h3>
      <p className="home__set-description">{set.description}</p>

      {/* Footer metadata and study entry button */}
      <footer className="home__set-footer">
        <Link to={`/cards/${set.id}`}>
          <button
            className="home__set-button home__set-button--play"
            type="button"
            aria-label="ابدأ المراجعة"
          >
            <FaRegPlayCircle />
          </button>
        </Link>

        {/* Card stats and visual progress indicator */}
        <div className="home__set-meta">
          <div className="home__set-texts">
            <p className="home__set-count">{set.cards.length} بطاقة</p>
            <p
              className={`home__set-status home__set-status--${set.calculatedTone}`}
            >
              {getToneLabel(set.calculatedTone)}
            </p>
          </div>

          {/* Dynamic progress circle using CSS custom properties */}
          <div
            className={`home__progress home__progress--${set.calculatedTone}`}
            style={{ "--progress": `${set.progress}%` }}
          >
            <span>{set.progress}%</span>
          </div>
        </div>
      </footer>
    </article>
  );
}
