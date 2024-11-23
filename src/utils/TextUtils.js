export const TextUtils = {
  splitIngredients: (ingredientsText) => {
    return ingredientsText.split("\n").filter((line) => line.trim());
  },

  splitInstructions: (instructionsText) => {
    return instructionsText.split("\n").filter((line) => line.trim());
  },

  truncateText: (text, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  },

  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  },
};
