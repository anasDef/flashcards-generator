import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";


// eslint-disable-next-line react-refresh/only-export-components
export const FlashcardsContext = createContext([]);

export default function FlashcardsProvider({ children }) {
  const [cardsSets, setCardsSets] = useLocalStorage("cardsSets", []);
  const [currentSet, setCurrentSet] = useLocalStorage("currentSet", {
    title: "",
    description: "",
    source: "يدوي",
    cards: [],
    id: Date.now(),
  });

  // ==== HANDLERS ==== //
  const handleAddSetClick = (newSet) => {
    setCardsSets([...cardsSets, newSet]);
  };

  const handleDeleteSetClick = (id) => {
    setCardsSets(cardsSets.filter((set) => set.id !== id));
  };

  const handleSpecificCurrentSetChange = (key, value) => {
    setCurrentSet({ ...currentSet, [key]: value });
  };

  const handleCurrentSetChange = (newValue) => setCurrentSet(newValue);

  // EDITED BY CODEX
  const handleEditSetClick = (updatedSet) => {
    setCardsSets(
      cardsSets.map((set) =>
        String(set.id) === String(updatedSet.id) ? updatedSet : set,
      ),
    );
  };

  return (
    <FlashcardsContext.Provider
      value={{
        cardsSets,
        currentSet,
        handleAddSetClick,
        handleDeleteSetClick,
        handleEditSetClick,
        handleSpecificCurrentSetChange,
        handleCurrentSetChange,
      }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
}
