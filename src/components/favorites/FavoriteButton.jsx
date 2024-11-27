import { useState, useEffect } from "react";
import {
  addFavorite,
  removeFavorite,
  checkIfFavorite,
} from "../../services/favoriteService";
import { useRecipePermissions } from "../../hooks/useRecipePermissions";
import { getRecipeById } from "../../services/recipeService";

export const FavoriteButton = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null);
  const { canFavorite } = useRecipePermissions(recipe);
  const currentUser = JSON.parse(localStorage.getItem("recipe_user"));
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  useEffect(() => {
    getRecipeById(recipeId).then(setRecipe);
  }, [recipeId]);

  useEffect(() => {
    if (recipe) {
      checkIfFavorite(recipeId, currentUser.id).then((favorite) => {
        setIsFavorite(!!favorite);
        setFavoriteId(favorite?.id);
      });
    }
  }, [recipeId, currentUser.id, recipe]);

  if (!canFavorite) return null;

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(favoriteId);
        setIsFavorite(false);
        setFavoriteId(null);
      } else {
        const newFavorite = await addFavorite(recipeId, currentUser.id);
        setIsFavorite(true);
        setFavoriteId(newFavorite.id);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <button
      className="btn btn-link p-0"
      onClick={toggleFavorite}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <i
        className={`bi ${isFavorite ? "bi-star-fill" : "bi-star"}`}
        style={{
          color: isFavorite ? "var(--accent)" : "var(--text)",
          fontSize: "1.5rem",
        }}
      ></i>
    </button>
  );
};
