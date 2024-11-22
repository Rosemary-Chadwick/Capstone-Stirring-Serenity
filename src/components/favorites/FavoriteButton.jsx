import { useState, useEffect } from "react";
import {
  addFavorite,
  removeFavorite,
  checkIfFavorite,
} from "../../services/favoriteService";

export const FavoriteButton = ({ recipeId, authorId }) => {
  const currentUser = JSON.parse(localStorage.getItem("recipe_user"));

  if (Number(authorId) === Number(currentUser.id)) return null;

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const favorite = await checkIfFavorite(recipeId, currentUser.id);
      setIsFavorite(!!favorite);
      setFavoriteId(favorite?.id);
    };
    checkFavoriteStatus();
  }, [recipeId, currentUser.id]);

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
