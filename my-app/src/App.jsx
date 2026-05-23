import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router";
import { IoArrowBack } from "react-icons/io5";
import { TbPlayCardStarFilled } from "react-icons/tb";
import Home from "./pages/Home";
import CreateSet from "./pages/CreateSet";
import Cards from "./pages/Cards";
import FlashcardsProvider from "./context/FlashcardsContext";

function App() {
  const location = useLocation();

  return (
    <>
      <header className="header">
        <div className="header__container container">
          <div className="header__logo">
            <h1>Memora</h1>
            <TbPlayCardStarFilled className="header__logo-icon" />
          </div>

          {location.pathname !== "/" && (
            <Link
              className="header__return button"
              to="/"
              aria-label="العودة للرئيسية"
            >
              <IoArrowBack />
              <span className="header__return-text">العودة للرئيسية</span>
            </Link>
          )}
        </div>
      </header>
      {/* ============= */}
      <FlashcardsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-set/:setId" element={<CreateSet />} />
          <Route path="/cards/:setId" element={<Cards />} />
        </Routes>
      </FlashcardsProvider>
    </>
  );
}

export default App;
