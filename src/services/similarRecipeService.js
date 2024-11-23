import { SimilarityUtils } from "../utils/SimilarityUtils";

const API_BASE = "http://localhost:8088";

export const getSimilarRecipes = async (recipeId, limit = 2) => {
  try {
    const [currentRecipe, allRecipes] = await Promise.all([
      fetch(`${API_BASE}/recipes/${recipeId}?_expand=cookingMethod`).then(
        (res) => res.json()
      ),
      fetch(`${API_BASE}/recipes?_expand=cookingMethod&_expand=user`).then(
        (res) => res.json()
      ),
    ]);

    const recipesWithScores = allRecipes
      .filter((recipe) => recipe.id !== parseInt(recipeId))
      .map((recipe) => {
        const similarity = SimilarityUtils.calculateSimilarityScore(
          currentRecipe,
          recipe
        );
        return {
          ...recipe,
          similarityScore: similarity.totalScore,
          similarityBreakdown: similarity.breakdown,
        };
      });

    const similarRecipes = recipesWithScores
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, limit);

    return similarRecipes;
  } catch (error) {
    console.error("Error in getSimilarRecipes:", error);
    throw error;
  }
};
