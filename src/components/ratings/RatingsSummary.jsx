import { useState, useEffect } from "react";
import {
  getRecipeRatings,
  addOrUpdateRating,
} from "../../services/ratingService";
import { getRecipeById } from "../../services/recipeService";
import { RatingStars } from "./RatingStars";
import { RatingsList } from "./RatingsList";

export const RatingsSummary = ({ recipeId }) => {
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [recipe, setRecipe] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("recipe_user"));

  useEffect(() => {
    getRecipeById(recipeId).then(setRecipe);
    loadRatings();
  }, [recipeId]);

  const loadRatings = () => {
    getRecipeRatings(recipeId).then((fetchedRatings) => {
      if (Array.isArray(fetchedRatings)) {
        setRatings(fetchedRatings);
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

  if (recipe?.userId === currentUser.id) {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-3">Recipe Rating</h4>
          <p className="card-text">Average Rating: {averageRating}</p>
          <p className="card-text">Total Ratings: {ratings.length}</p>
          <RatingsList ratings={ratings} />
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title mb-4">Recipe Rating</h4>
        <RatingStars currentRating={userRating} onRatingChange={handleRating} />
        <p className="text-muted">Average Rating: {averageRating}</p>
        <p className="text-muted">Total Ratings: {ratings.length}</p>
      </div>
    </div>
  );
};
