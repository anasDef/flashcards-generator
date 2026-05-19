import "./App.css";
import { Routes, Route } from "react-router";
import { TbPlayCardStarFilled } from "react-icons/tb";
import Home from "./pages/Home";
import CreateSet from "./pages/CreateSet";
import Cards from "./pages/Cards";
import FlashcardsProvider from "./context/FlashcardsContext";

function App() {
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
      <FlashcardsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-set:/id" element={<CreateSet />} />
          <Route path="/cards:/id" element={<Cards />} />
        </Routes>
      </FlashcardsProvider>
    </>
  );
}

export default App;
