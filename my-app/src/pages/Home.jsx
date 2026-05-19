import { CiCirclePlus } from "react-icons/ci";
import { IoChevronDown } from "react-icons/io5";
import { Link } from "react-router";
import { useContext, useMemo, useState } from "react";
import SetCard from "../components/SetCard";
import { FlashcardsContext } from "../context/FlashcardsContext";
import "./Home.css";

const filters = [
  { label: "الكل", tone: "all", id: 1 },
  { label: "ضعيف", tone: "weak", id: 2 },
  { label: "متوسط", tone: "medium", id: 3 },
  { label: "ممتاز", tone: "strong", id: 4 },
];

export default function Home() {
  const { cardsSets } = useContext(FlashcardsContext);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeFilterLabel =
    filters.find((filter) => filter.tone === selectedFilter)?.label ||
    filters[0].label;

  const filteredSets = useMemo(() => {
    const computedSets = cardsSets.map((set) => {
      const setProgress =
        set.cards.length > 0
          ? Math.round(
              (set.cards.filter((card) => card.isUnderstood).length /
                set.cards.length) *
                100,
            )
          : 0;

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

    if (selectedFilter === "all") return computedSets;
    return computedSets.filter((set) => set.calculatedTone === selectedFilter);
  }, [cardsSets, selectedFilter]);

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
        </div>
      </header>

      <section className="home__filters container" aria-label="ازرار التصفية">
        <div className="home__filters-actions">
          <div className="home__filters-group">
            <p className="home__filters-label">تصفية حسب:</p>

            <div className="home__filters-desktop">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`home__filter-button ${
                    filter.tone ? `home__filter-button--${filter.tone}` : ""
                  } ${filter.tone === selectedFilter ? "active" : ""}`}
                  type="button"
                  value={filter.tone}
                  onClick={(event) =>
                    setSelectedFilter(event.currentTarget.value)
                  }
                >
                  <span>{filter.label}</span>
                  {filter.tone !== "all" && (
                    <span
                      className={`home__filter-dot home__filter-dot--${filter.tone}`}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="home__filters-mobile">
              <button
                className="home__dropdown-trigger"
                type="button"
                aria-expanded={isDropdownOpen}
                aria-controls="home-filters-menu"
                onClick={() => setIsDropdownOpen((prevState) => !prevState)}
              >
                <span>{activeFilterLabel}</span>
                <IoChevronDown
                  className={`home__dropdown-icon ${
                    isDropdownOpen ? "home__dropdown-icon--open" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="home__dropdown-menu" id="home-filters-menu">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      className={`home__dropdown-item ${
                        filter.tone === selectedFilter ? "active" : ""
                      }`}
                      type="button"
                      onClick={() => {
                        setSelectedFilter(filter.tone);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <span>{filter.label}</span>
                      {filter.tone !== "all" && (
                        <span
                          className={`home__filter-dot home__filter-dot--${filter.tone}`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Link className="home__create-link" to="/create-set/new">
            <button className="home__create-button" type="button">
              انشاء مجموعة جديدة
              <CiCirclePlus className="home__create-icon" />
            </button>
          </Link>
        </div>
      </section>

      <section className="home__sets container">
        {filteredSets.length > 0 ? (
          filteredSets.map((set) => <SetCard set={set} key={set.id} />)
        ) : (
          <p className="home__no-sets">لا يوجد مجموعات</p>
        )}
      </section>
    </main>
  );
}
