const commonWords = new Set([
  // Units and measurements
  "cup",
  "teaspoon",
  "tablespoon",
  "ounce",
  "pound",
  "gram",
  "milliliter",
  "liter",
  "cups",
  "teaspoons",
  "tablespoons",
  "ounces",
  "pounds",
  "grams",
  "ml",
  "l",
  "tsp",
  "tbsp",
  "oz",
  "lb",
  "g",
  "kg",
  "c",

  // Numbers and fractions
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "½",
  "⅓",
  "¼",
  "⅔",
  "¾",
  "⅛",
  "1/2",
  "1/3",
  "1/4",
  "2/3",
  "3/4",
  "1/8",
  "one",
  "two",
  "three",
  "four",
  "five",
  "half",
  "quarter",

  // Prepositions and articles
  "of",
  "and",
  "the",
  "to",
  "in",
  "for",
  "with",
  "or",
  "by",
  "from",

  // Common cooking preparations
  "chopped",
  "diced",
  "minced",
  "sliced",
  "grated",
  "crushed",
  "ground",
  "peeled",
  "seeded",
  "cored",
  "julienned",
  "whole",
  "halved",
  "quartered",

  // Descriptors
  "fresh",
  "dried",
  "frozen",
  "canned",
  "large",
  "medium",
  "small",
  "fine",
  "coarse",
  "thin",
  "thick",
  "room",
  "temperature",

  // Punctuation and spaces
  ",",
  ".",
  "-",
  " ",
  "(",
  ")",
  "/",

  // Common recipe phrases
  "taste",
  "optional",
  "needed",
  "about",
  "approximately",
]);

// Map common ingredient variations to a standard form
const ingredientMap = {
  "red pepper": "bell pepper",
  "green pepper": "bell pepper",
  "yellow pepper": "bell pepper",
  "red onion": "onion",
  "yellow onion": "onion",
  "white onion": "onion",
  "vegetable oil": "oil",
  "canola oil": "oil",
  "kosher salt": "salt",
  "sea salt": "salt",
  "table salt": "salt",
  "black pepper": "pepper",
  "ground pepper": "pepper",
  "chicken breast": "chicken",
  "chicken thigh": "chicken",
  "chicken wing": "chicken",
  "beef chuck": "beef",
  "ground beef": "beef",
  "beef sirloin": "beef",
};

export const SimilarityUtils = {
  calculateJaccardSimilarity: (set1, set2) => {
    const intersection = new Set([...set1].filter((x) => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
  },

  normalizeIngredient: (ingredient) => {
    let normalized = ingredient.toLowerCase().trim();

    // Replace common ingredient variations with standard forms
    for (const [variant, standard] of Object.entries(ingredientMap)) {
      if (normalized.includes(variant)) {
        normalized = normalized.replace(variant, standard);
      }
    }

    // Remove parenthetical notes
    normalized = normalized.replace(/\([^)]*\)/g, "");

    // Remove measurements and numbers
    normalized = normalized.replace(
      /[\d½⅓¼⅔¾⅛]+\s*(?:cup|teaspoon|tablespoon|ounce|pound|gram|g|oz|lb|tsp|tbsp|ml|l)\s*/gi,
      ""
    );

    return normalized;
  },

  preprocessText: (text, splitByNewline = false) => {
    if (splitByNewline) {
      return text
        .toLowerCase()
        .split("\n")
        .map((line) => SimilarityUtils.normalizeIngredient(line))
        .flatMap((ingredient) =>
          ingredient.split(/\s+/).filter((word) => !commonWords.has(word))
        );
    }
    return text
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => !commonWords.has(word));
  },

  calculateTitleSimilarity: (title1, title2) => {
    const words1 = new Set(SimilarityUtils.preprocessText(title1));
    const words2 = new Set(SimilarityUtils.preprocessText(title2));
    return SimilarityUtils.calculateJaccardSimilarity(words1, words2);
  },

  calculateIngredientSimilarity: (ingredients1, ingredients2) => {
    const words1 = new Set(SimilarityUtils.preprocessText(ingredients1, true));
    const words2 = new Set(SimilarityUtils.preprocessText(ingredients2, true));
    return SimilarityUtils.calculateJaccardSimilarity(words1, words2);
  },

  calculateCookingTimeScore: (time1, time2) => {
    return 1 - Math.abs(time1 - time2) / Math.max(time1, time2);
  },

  calculateSimilarityScore: (recipe1, recipe2) => {
    const scores = {
      title:
        SimilarityUtils.calculateTitleSimilarity(recipe1.title, recipe2.title) *
        0.3,
      cookingMethod:
        recipe1.cookingMethodId === recipe2.cookingMethodId ? 0.3 : 0,
      ingredients:
        SimilarityUtils.calculateIngredientSimilarity(
          recipe1.ingredients,
          recipe2.ingredients
        ) * 0.3,
      cookingTime:
        SimilarityUtils.calculateCookingTimeScore(
          recipe1.cookingTime,
          recipe2.cookingTime
        ) * 0.1,
    };

    return {
      totalScore: Object.values(scores).reduce((a, b) => a + b, 0),
      breakdown: scores,
    };
  },
};
