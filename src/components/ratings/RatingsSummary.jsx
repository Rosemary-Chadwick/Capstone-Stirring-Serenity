import { useState, useEffect } from "react";
import {
  getRecipeRatings,
  addOrUpdateRating,
} from "../../services/ratingService";
import { getRecipeById } from "../../services/recipeService";
import { RatingStars } from "./RatingStars";
import { RatingsList } from "./RatingsList";
import { useRecipePermissions } from "../../hooks/useRecipePermissions";

export const RatingsSummary = ({ recipeId }) => {
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [recipe, setRecipe] = useState(null);
  const { canRate, isOwner } = useRecipePermissions(recipe);

  useEffect(() => {
    getRecipeById(recipeId).then(setRecipe);
    loadRatings();
  }, [recipeId]);

  const loadRatings = () => {
    getRecipeRatings(recipeId).then((fetchedRatings) => {
      if (Array.isArray(fetchedRatings)) {
        setRatings(fetchedRatings);
        const currentUser = JSON.parse(localStorage.getItem("recipe_user"));
        const userRating = fetchedRatings.find(
          (r) => r.userId === currentUser.id
        );
        setUserRating(userRating ? userRating.rating : 0);
      } else {
        setRatings([]);
        setUserRating(0);
      }
    });
  };

  const handleRating = async (rating) => {
    if (!canRate) return;

    const currentUser = JSON.parse(localStorage.getItem("recipe_user"));
    await addOrUpdateRating({
      recipeId: parseInt(recipeId),
      userId: currentUser.id,
      rating,
      dateCreated: new Date().toISOString(),
    });
    setUserRating(rating);
    loadRatings();
  };

  const averageRating =
    ratings.length > 0
      ? (
          ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
        ).toFixed(1)
      : "No ratings yet";

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title mb-3">Recipe Rating</h4>
        <p className="card-text">Average Rating: {averageRating}</p>
        <p className="card-text">Total Ratings: {ratings.length}</p>

        {canRate && (
          <div className="mb-3">
            <RatingStars
              currentRating={userRating}
              onRatingChange={handleRating}
            />
          </div>
        )}

        <RatingsList ratings={ratings} />
      </div>
    </div>
  );
};
