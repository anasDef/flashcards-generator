// EDITED BY CODEX
export function calculateSetsProgress(array) {
  if (!Array.isArray(array)) return [];
  return array.map((set) => {
    const cards = Array.isArray(set?.cards) ? set.cards : [];
    const setProgress =
      cards.length > 0
        ? Math.round(
            (cards.filter((card) => card.isUnderstood).length / cards.length) *
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
      cards,
      progress: setProgress,
      calculatedTone: tone,
    };
  });
}
