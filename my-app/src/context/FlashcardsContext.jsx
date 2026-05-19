import { useState, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const FlashcardsContext = createContext([]);

export default function FlashcardsProvider({ children }) {
  const [cardsSets, setCardsSets] = useLocalStorage("cardsSets", []);
  const [currentSet, setCurrentSet] = useState({
    title: "",
    description: "",
    id: "",
    source: "يدوي",
    cards: [],
  });

  // ==== HANDLERS ==== //
  const handleAddSetClick = (newSet) => {
    setCardsSets([...cardsSets, newSet]);
  };

  const handleDeleteSetClick = (id) => {
    setCardsSets(cardsSets.filter((set) => set.id !== id));
  };

  const handleCurrentSetChange = (key, value) => {
    setCurrentSet({ ...currentSet, [key]: value });
  };
  return (
    <FlashcardsContext.Provider
      value={{
        cardsSets,
        currentSet,
        handleAddSetClick,
        handleDeleteSetClick,
        handleCurrentSetChange,
      }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
}
