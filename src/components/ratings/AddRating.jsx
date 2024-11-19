import { useState, useEffect } from "react";
import {
  getRecipeRatings,
  addOrUpdateRating,
} from "../../services/ratingService";
import { getRecipeById } from "../../services/recipeService";

const DisplayStars = ({ rating }) => {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`bi ${star <= rating ? "bi-star-fill" : "bi-star"}`}
          style={{
            color: star <= rating ? "var(--accent)" : "var(--text)",
            fontSize: "1rem",
          }}
        ></i>
      ))}
    </span>
  );
};

export const RatingStars = ({ currentRating, onRatingChange }) => {
  return (
    <div className="d-flex align-items-center mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className="btn btn-link p-0 me-2"
          onClick={() => onRatingChange(star)}
        >
          <i
            className={`bi ${
              star <= currentRating ? "bi-star-fill" : "bi-star"
            }`}
            style={{
              color: star <= currentRating ? "var(--accent)" : "var(--text)",
              fontSize: "1.5rem",
            }}
          ></i>
        </button>
      ))}
    </div>
  );
};
// className={`bi ${star <= userRating ? "bi-star-fill" : "bi-star"}`}
// If star <= userRating, the icon gets the class "bi-star-fill", meaning the star is filled.
// Otherwise, it gets "bi-star", meaning the star is outlined or empty.

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
  //ternary operator- set userRating if the userRating exists then it will set setUserRating state with the rating if not then it will default to 0

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

  //       reduce() - Adds up all the rating values in the ratings array
  // acc - (accumulator) starts at 0
  // curr - represents each item in the array
  // 0 - is where the acc starts ... It also handles an empty array, returning 0 instead of an error or undefined.
  // / - divide
  // .toFixed(1) - Round to 1 decimal place

  if (recipe?.userId === currentUser.id) {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-3">Recipe Rating</h4>
          <p className="card-text">Average Rating: {averageRating}</p>
          <p className="card-text">Total Ratings: {ratings.length}</p>
          {ratings.map((rating) => (
            <div key={rating.id} className="mb-2">
              <small className="text-muted">
                <DisplayStars rating={rating.rating} />
                <span className="ms-3"> {rating.user.username}</span>
              </small>
            </div>
          ))}
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
