export function filterCardsSets(array) {
  return array.map((set) => {
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
}
