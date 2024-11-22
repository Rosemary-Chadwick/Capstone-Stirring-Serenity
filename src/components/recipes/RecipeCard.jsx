// components/recipes/RecipeCard.jsx
import { FavoriteButton } from "../favorites/FavoriteButton";
import { DisplayRating } from "../ratings/DisplayRatings";

export const RecipeCard = ({ recipe, onViewRecipe }) => {
  return (
    <div className="card h-100">
      {recipe.thumbnailUrl && (
        <img
          src={recipe.thumbnailUrl}
          className="card-img-top"
          alt={recipe.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title">{recipe.title}</h5>
          <FavoriteButton recipeId={recipe.id} authorId={recipe.userId} />
        </div>
        <p className="card-text">
          <small className="text-muted">By: {recipe.user?.username}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">
            Cooking Time: {recipe.cookingTime} minutes
          </small>
        </p>
        <p className="card-text">
          <small className="text-muted">
            Method: {recipe.cookingMethod?.name}
          </small>
        </p>
        <div className="mb-2">
          <DisplayRating recipeId={recipe.id} />
        </div>
        <button className="btn btn-primary mt-auto" onClick={onViewRecipe}>
          View Recipe
        </button>
      </div>
    </div>
  );
};
