import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSimilarRecipes } from "../../../services/similarRecipeService";
import { SimilarRecipeCard } from "./SimilarRecipeCard";

export const SimilarRecipes = ({ currentRecipeId }) => {
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSimilarRecipes = async () => {
      setIsLoading(true);
      try {
        const recipes = await getSimilarRecipes(currentRecipeId);
        setSimilarRecipes(recipes);
      } catch (error) {
        console.error("Error loading similar recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSimilarRecipes();
  }, [currentRecipeId]);

  if (isLoading) return <div>Finding similar recipes...</div>;
  if (similarRecipes.length === 0) return null;

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h4 className="card-title mb-4 justify-content-center">
          Similar Recipes
        </h4>
        <div className="row g-4">
          {similarRecipes.map((recipe) => (
            <SimilarRecipeCard
              key={recipe.id}
              recipe={recipe}
              onViewRecipe={() => navigate(`/recipes/${recipe.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
