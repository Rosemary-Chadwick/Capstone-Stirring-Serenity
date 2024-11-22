const API_BASE = "http://localhost:8088";

// Helper function to calculate ingredient similarity score
const calculateIngredientSimilarity = (ingredients1, ingredients2) => {
  const ingredientList1 = ingredients1.toLowerCase().split("\n");
  const ingredientList2 = ingredients2.toLowerCase().split("\n");

  // Create sets of words from ingredients, excluding common words
  const commonWords = new Set([
    "cup",
    "teaspoon",
    "tablespoon",
    "ounce",
    "pound",
    "gram",
    "of",
    "and",
    "the",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "/",
    "0",
    "1/2",
    "1/3",
    "1/4",
    ",",
    ".",
    "teaspoons",
    "tablespoons",
    "ounces",
    "pounds",
    "grams",
    "cups",
    "tbsp",
    "tbsp",
    "tsp",
    "tsp",
    "to",
    "taste",
    "fresh",
    "slices",
    "slice",
    "chopped",
    "chop",
    "diced",
    "dice",
    "mince",
    "minced",
    "large",
    "small",
    "medium",
    "inch",
    "inches",
    "or",
    "for",
    " ",
  ]);

  //.flatmap() splits array with nested arrays(ingredients), into individual words, and produces a single array of all the words.
  const words1 = new Set(
    ingredientList1.flatMap((i) =>
      i.split(" ").filter((word) => !commonWords.has(word))
    )
  );
  const words2 = new Set(
    ingredientList2.flatMap((i) =>
      i.split(" ").filter((word) => !commonWords.has(word))
    )
  );

  // Calculate intersection and union
  const intersection = new Set([...words1].filter((x) => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  // Jaccard similarity coefficient
  return intersection.size / union.size;
};

// Purpose: Measures how similar two sets are by comparing their overlap (intersection) to their total size (union).
// Intersection: Elements that exist in both sets.
// Union: All unique elements across both sets.

// Calculate overall similarity score
const calculateSimilarityScore = (recipe1, recipe2) => {
  const scores = {
    cookingMethod:
      recipe1.cookingMethodId === recipe2.cookingMethodId ? 0.4 : 0,
    cookingTime:
      1 -
      (Math.abs(recipe1.cookingTime - recipe2.cookingTime) /
        Math.max(recipe1.cookingTime, recipe2.cookingTime)) *
        0.2,
    ingredients:
      calculateIngredientSimilarity(recipe1.ingredients, recipe2.ingredients) *
      0.4,
  };

  return scores.cookingMethod + scores.cookingTime + scores.ingredients;
};

//Math.abs(recipe1.cookingTime - recipe2.cookingTime): Finds the absolute difference between the cooking times.
// / Math.max(recipe1.cookingTime, recipe2.cookingTime): Normalizes the difference relative to the longer cooking time (producing a value between 0 and 1).
// * 0.2: Multiplies the result by 0.2 to reduce its weight in the calculation.
// 1 -: Inverts the value, so a smaller difference gives a higher score.

export const getSimilarRecipes = async (recipeId, limit = 2) => {
  try {
    // Get current recipe and all other recipes
    const [currentRecipe, allRecipes] = await Promise.all([
      fetch(`${API_BASE}/recipes/${recipeId}?_expand=cookingMethod`).then(
        (res) => res.json()
      ),
      fetch(`${API_BASE}/recipes?_expand=cookingMethod&_expand=user`).then(
        (res) => res.json()
      ),
    ]);

    // Filter out current recipe and calculate similarity scores
    const recipesWithScores = allRecipes
      .filter((recipe) => recipe.id !== parseInt(recipeId))
      .map((recipe) => ({
        ...recipe,
        similarityScore: calculateSimilarityScore(currentRecipe, recipe),
      }));

    // Sort by similarity score and take top results
    const similarRecipes = recipesWithScores
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, limit);

    return similarRecipes;
  } catch (error) {
    console.error("Error in getSimilarRecipes:", error);
    throw error;
  }
};

export const getSimilarityDetails = (recipe1, recipe2) => {
  const details = {
    cookingMethodMatch: recipe1.cookingMethodId === recipe2.cookingMethodId,
    cookingTimeVariance: Math.abs(recipe1.cookingTime - recipe2.cookingTime),
    ingredientSimilarity: calculateIngredientSimilarity(
      recipe1.ingredients,
      recipe2.ingredients
    ),
  };

  return details;
};
