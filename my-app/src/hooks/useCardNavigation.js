// hooks/useCardNavigation.js
import { useReducer, useRef } from "react"
import { initialState, cardsReducer } from "../reducers/CardsReducer";

export function useCardNavigation(cards) {
  const [state, dispatch] = useReducer(cardsReducer, initialState);
  const { currentIndex, isFlipped, slideClass } = state;
  const isAnimating = useRef(false);

  const navigate = (direction) => {
    if (isAnimating.current) return;
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex === currentIndex) return;

    isAnimating.current = true;
    const exitClass = direction === "next"
      ? "cards__card-wrapper--exit-left"
      : "cards__card-wrapper--exit-right";
    const enterClass = direction === "next"
      ? "cards__card-wrapper--enter-right"
      : "cards__card-wrapper--enter-left";

    dispatch({ type: "SET_SLIDE_EXIT", payload: exitClass });
    setTimeout(() => {
      dispatch({ type: "ADVANCE_CARD", payload: { newIndex, enterClass } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_SLIDE" });
        isAnimating.current = false;
      }, 350);
    }, 280);
  };

  const handleFlip = () => dispatch({ type: "FLIP" });

  return { currentIndex, isFlipped, slideClass, navigate, handleFlip };
}