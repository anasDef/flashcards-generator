import "./App.css";
import { Routes, Route } from "react-router";
import { useMemo, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { TbPlayCardStarFilled } from "react-icons/tb";
import Home from "./pages/Home";
import CreateSet from "./pages/CreateSet";
import Cards from "./pages/Cards";

function App() {
  const [cardsSets, setCardsSets] = useLocalStorage("cardsSets", []);
  const [cardsSet, setCardsSet] = useState({
    title: "",
    description: "",
    id: "",
    cards: [],
  });

  // ==== HANDLERS
  const handleAddSetClick = (newSet) => {
    setCardsSets([...cardsSets, newSet]);
  };

  const handleDeleteSetClick = (id) => {
    setCardsSets(cardsSets.filter((set) => set.id !== id));
  };

  return (
    <>
      <header className="header">
        <div className="header__container container">
          <div className="header__logo">
            <h1>Memora</h1>
            <TbPlayCardStarFilled className="header__logo-icon" />
          </div>
        </div>
      </header>
      {/* ============= */}
      <Routes>
        <Route
          path="/"
          element={<Home sets={cardsSets} onDeleteSet={handleDeleteSetClick} />}
        />
        <Route path="/create-set:/id" element={<CreateSet />} />
        <Route path="/cards:/id" element={<Cards />} />
      </Routes>
    </>
  );
}

export default App;
