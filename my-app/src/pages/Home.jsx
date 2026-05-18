import { CiCirclePlus } from "react-icons/ci";
import { FaRegPlayCircle } from "react-icons/fa";

import "./Home.css";

const filters = [
  { label: "الكل", id: 1 },
  { label: "ضعيف", tone: "weak", id: 2 },
  { label: "متوسط", tone: "medium", id: 3 },
  { label: "قوي", tone: "strong", id: 4 },
];

const sets = [
  {
    title: "عواصم العالم",
    description: "Geography focus on South America and ...Eastern Europe",
    source: "ذكاء اصطناعي",
    cardsCount: 85,
    status: "على المسار الصحيح",
    statusTone: "medium",
    progress: 58,
    cornerTone: "medium-soft",
  },
];

export default function Home() {
  return (
    <main className="home">
      <header className="home__header">
        <div className="container home__header-container">
          <div className="home__title">
            <h2 className="home__main-title">بطاقاتي التعليمية</h2>
            <p className="home__subtitle">
              التقط من حيث توقفت أو قم بإنشاء مجموعة جديدة.
            </p>
          </div>

          <button className="home__header-button" type="button">
            إنشاء مجموعة جديدة
            <CiCirclePlus />
          </button>
        </div>
      </header>

      <section className="home__filters container" aria-label="تصفية المجموعات">
        <p className="home__filters-label">تصفية حسب:</p>

        {filters.map((filter, i) => (
          <button
            key={filter.id}
            className={`home__filter-button ${
              filter.tone ? `home__filter-button--${filter.tone}` : ""
            } ${i === 0 ? "active" : ""}`}
            type="button"
            value={filter.label}
          >
            <span>{filter.label}</span>
            {filter.tone && (
              <span
                className={`home__filter-dot home__filter-dot--${filter.tone}`}
              />
            )}
            {filter.type && <span className="home__filter-icon">*</span>}
          </button>
        ))}
      </section>

      <section
        className="home__sets container"
        aria-label="مجموعات البطاقات التعليمية"
      >
        {sets.map((set) => (
          <article key={set.title} className="home__set-card">
            <span
              className={`home__set-corner home__set-corner--${set.cornerTone}`}
              aria-hidden="true"
            />

            <div className="home__set-top">
              <button
                className="home__set-menu"
                type="button"
                aria-label="خيارات"
              >
                تعديل
              </button>

              <span className="home__set-source">{set.source}</span>
            </div>

            <h3 className="home__set-title">{set.title}</h3>
            <p className="home__set-description">{set.description}</p>

            <footer className="home__set-footer">
              <button
                className="home__set-play"
                type="button"
                aria-label="ابدأ المراجعة"
              >
                <FaRegPlayCircle />
              </button>

              <div className="home__set-meta">
                <div className="home__set-texts">
                  <p className="home__set-count">{set.cardsCount} بطاقة</p>
                  <p
                    className={`home__set-status home__set-status--${set.statusTone}`}
                  >
                    {set.status}
                  </p>
                </div>

                <div
                  className={`home__progress home__progress--${set.statusTone}`}
                  style={{ "--progress": `${set.progress}%` }}
                >
                  <span>{set.progress}%</span>
                </div>
              </div>
            </footer>
          </article>
        ))}
      </section>
    </main>
  );
}
