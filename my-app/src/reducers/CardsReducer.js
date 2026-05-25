export const initialState = {
    currentIndex: 0,
    isFlipped: false,
    slideClass: "",
};

export function cardsReducer(state, { type, payload }) {
    switch (type) {
        case "SET_SLIDE_EXIT":
            return { ...state, slideClass: payload };

        case "ADVANCE_CARD":
            return {
                ...state,
                currentIndex: payload.newIndex,
                isFlipped: false,
                slideClass: payload.enterClass,
            };

        case "CLEAR_SLIDE":
            return { ...state, slideClass: "" };

        case "FLIP":
            return { ...state, isFlipped: !state.isFlipped };

        default:
            return state;
    }
}