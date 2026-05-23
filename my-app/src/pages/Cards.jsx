// EDITED BY CODEX

import { useContext, useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  IoChevronForward,
  IoChevronBack,
  IoArrowForward,
  IoCheckmark,
  IoClose,
} from "react-icons/io5";
import { FlashcardsContext } from "../context/FlashcardsContext";
import "./Cards.css";

const Cards = () => {
  const { setId } = useParams();
  const { cardsSets, handleEditSetClick } = useContext(FlashcardsContext);
  const navigateToHome = useNavigate();

  const currentSet = cardsSets?.find((set) => set.id == setId);
  const cards = currentSet?.cards || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [slideClass, setSlideClass] = useState("");
  const isAnimating = useRef(false);

  const activeCard = cards[currentIndex];

  useEffect(() => {
    if (cards.length > 0 && currentIndex === cards.length) {
      navigateToHome("/");
    }
  }, [currentIndex, cards]);

  // ====== HANDLERS ====== //

  // ── Flip the active card front ↔ back ──────────────────────────────────
  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  // ── Mark the active card as understood / not understood ───────────────
  const handleUnderstoodClick = (isUnderstood) => {
    const updatedCards = cards.map((card, index) =>
      index === currentIndex ? { ...card, isUnderstood } : card,
    );
    handleEditSetClick({ ...currentSet, cards: updatedCards });
    navigate("next");
  };

  // ── Navigate between cards with slide-fade transition ──────────────────
  const navigate = (direction) => {
    if (isAnimating.current) return;

    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex === currentIndex) return;

    isAnimating.current = true;

    // Exit animation: next slides left, prev slides right (RTL aware)
    const exitClass =
      direction === "next"
        ? "cards__card-wrapper--exit-left"
        : "cards__card-wrapper--exit-right";

    const enterClass =
      direction === "next"
        ? "cards__card-wrapper--enter-right"
        : "cards__card-wrapper--enter-left";

    setSlideClass(exitClass);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFlipped(false);
      setSlideClass(enterClass);

      setTimeout(() => {
        setSlideClass("");
        isAnimating.current = false;
      }, 350);
    }, 280);
  };

  const progress = cards.length ? ((currentIndex + 1) / cards.length) * 100 : 0;

  if (!currentSet) return null;

  return (
    <section className="cards">
      <div className="container">
        {/* ── Return Button ─────────────────────────────────────────── */}
        <Link
          className="cards__return button"
          to="/"
          aria-label="العودة للرئيسية"
        >
          <IoArrowForward />
        </Link>

        {/* ── Header ──────────────────────────────────────────────────
            Gap between return btn and this header = --spacing-gutter  */}
        <header className="cards__header">
          <p className="cards__counter">
            <span className="cards__counter-current">{currentIndex + 1}</span>
            {" / "}
            <span className="cards__counter-total">{cards.length}</span>
            {" بطاقة"}
          </p>
          <h1 className="cards__title">{currentSet.title}</h1>
        </header>

        {/* ── Progress Bar ─────────────────────────────────────────── */}
        <div
          className="cards__progress-bar"
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={cards.length}
        >
          <div
            className="cards__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* ── Card Viewer (arrows + card) ───────────────────────────── */}
        <div className="cards__viewer">
          {/* Prev arrow — renders on the RIGHT in RTL */}
          <button
            className="cards__nav-btn"
            onClick={() => navigate("prev")}
            disabled={currentIndex === 0}
            aria-label="البطاقة السابقة"
          >
            <IoChevronForward />
          </button>

          {/* Card wrapper — handles slide-fade transition */}
          <div className={`cards__card-wrapper ${slideClass}`}>
            <article
              className={`cards__card ${isFlipped ? "cards__card--flipped" : ""}`}
              onClick={handleFlip}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleFlip()}
              aria-label={
                isFlipped ? "الوجه الخلفي — انقر للعودة" : "انقر لإظهار التعريف"
              }
            >
              {/* Front face */}
              <div className="cards__card-front">
                <span className="cards__badge">مصطلح</span>
                <p className="cards__card-text">{activeCard?.front}</p>
                <p className="cards__card-hint">انقر لإظهار التعريف</p>
              </div>

              {/* Back face */}
              <div className="cards__card-back">
                <span className="cards__badge cards__badge--definition">
                  تعريف
                </span>
                <p className="cards__card-text">{activeCard?.back}</p>
              </div>
            </article>
          </div>

          {/* Next arrow — renders on the LEFT in RTL */}
          <button
            className="cards__nav-btn"
            onClick={() => navigate("next")}
            disabled={currentIndex === cards.length - 1}
            aria-label="البطاقة التالية"
          >
            <IoChevronBack />
          </button>
        </div>

        {/* ── Action Buttons ────────────────────────────────────────── */}
        <div className="cards__actions">
          <button
            className="cards__action-btn cards__action-btn--understood"
            onClick={() => handleUnderstoodClick(true)}
          >
            <IoCheckmark />
            فهمتها
          </button>
          <button
            className="cards__action-btn cards__action-btn--not-understood"
            onClick={() => handleUnderstoodClick(false)}
          >
            <IoClose />
            لم أفهم
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cards;
