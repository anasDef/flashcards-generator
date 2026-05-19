import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router";
import Set from "../components/Set";
import "./Home.css";
import { useMemo, useState } from "react";

// Available filtering options for the dashboard
const filters = [
  { label: "الكل", tone: "all", id: 1 },
  { label: "ضعيف", tone: "weak", id: 2 },
  { label: "متوسط", tone: "medium", id: 3 },
  { label: "قوي", tone: "strong", id: 4 },
];

// Dashboard component to display, filter, and manage flashcard sets
export default function Home({ sets, onDeleteSet }) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Dynamically calculates progress/status for each set and applies the filter
  const filteredSets = useMemo(() => {
    const computedSets = sets.map((set) => {
      // Calculate completion percentage based on understood cards
      const setProgress =
        set.cards.length > 0
          ? Math.round(
              (set.cards.filter((card) => card.isUnderstood).length /
                set.cards.length) *
                100,
            )
          : 0;

      // Determine the performance status based on the progress percentage
      let tone = "weak";
      if (setProgress > 50 && setProgress <= 80) {
        tone = "medium";
      } else if (setProgress > 80) {
        tone = "strong";
      }

      return {
        ...set,
        progress: setProgress,
        calculatedTone: tone,
      };
    });

    // Return all items if no specific filter is chosen, otherwise filter by status
    if (selectedFilter === "all") return computedSets;
    return computedSets.filter((set) => set.calculatedTone === selectedFilter);
  }, [sets, selectedFilter]);

  return (
    <main className="home">
      {/* Dashboard Top Header */}
      <header className="home__header">
        <div className="container home__header-container">
          <div className="home__title">
            <h2 className="home__main-title">بطاقاتي التعليمية</h2>
            <p className="home__subtitle">
              التقط من حيث توقفت أو قم بإنشاء مجموعة جديدة.
            </p>
          </div>

          <Link to="/create-set/new">
            <button className="home__header-button" type="button">
              إنشاء مجموعة جديدة
              <CiCirclePlus className="home__header-icon" />
            </button>
          </Link>
        </div>
      </header>

      {/* Filter Controls Section */}
      <section className="home__filters container" aria-label="تصفية المجموعات">
        <p className="home__filters-label">تصفية حسب:</p>

        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`home__filter-button ${
              filter.tone ? `home__filter-button--${filter.tone}` : ""
            } ${filter.tone === selectedFilter ? "active" : ""}`}
            type="button"
            value={filter.tone}
            onClick={(e) => setSelectedFilter(e.currentTarget.value)}
          >
            <span>{filter.label}</span>
            {filter.tone != "all" && (
              <span
                className={`home__filter-dot home__filter-dot--${filter.tone}`}
              />
            )}
          </button>
        ))}
      </section>

      {/* Flashcard Sets Grid Section */}
      <section className="home__sets container">
        {filteredSets.length > 0 ? (
          filteredSets.map((set) => {
            return <Set set={set} onDeleteSet={onDeleteSet} key={set.id} />;
          })
        ) : (
          <p className="home__no-sets">لا يوجد مجموعات</p>
        )}
      </section>
    </main>
  );
}
