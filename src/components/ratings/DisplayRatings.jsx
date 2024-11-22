// components/ratings/DisplayRating.jsx
import { useState, useEffect } from "react";
import { getRecipeRatings } from "../../services/ratingService";

export const DisplayRating = ({ recipeId, size = "sm" }) => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    getRecipeRatings(recipeId).then(setRatings);
  }, [recipeId]);

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
      : 0;

  const starSize = size === "lg" ? "1.5rem" : "1rem";

  return (
    <div className="d-flex align-items-center gap-2">
      {[...Array(5)].map((_, index) => (
        <i
          key={index}
          className={`bi ${
            index < Math.round(averageRating) ? "bi-star-fill" : "bi-star"
          }`}
          style={{
            color:
              index < Math.round(averageRating)
                ? "var(--accent)"
                : "var(--text)",
            fontSize: starSize,
          }}
        ></i>
      ))}
      <small className="text-muted">
        {ratings.length > 0 ? `(${ratings.length})` : "No ratings yet"}
      </small>
    </div>
  );
};
