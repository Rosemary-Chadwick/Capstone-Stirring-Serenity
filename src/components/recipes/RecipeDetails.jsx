import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "../../services/recipeService";
import { RatingsSummary } from "../ratings/RatingsSummary";
import { NotesList } from "../notes/NoteList";
import { SimilarRecipes } from "./similar/SimilarRecipes";
import { FavoriteButton } from "../favorites/FavoriteButton";
import { useRecipePermissions } from "../../hooks/useRecipePermissions";

export const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("recipe_user"));
  const { isOwner } = useRecipePermissions(recipe);

  useEffect(() => {
    if (recipeId) {
      getRecipeById(recipeId).then((data) => setRecipe(data));
    }
  }, [recipeId]);

  if (!recipe) return <div>Loading...</div>;

  const handleBack = () => {
    if (isOwner) {
      navigate("/recipes/my-recipes");
    } else {
      navigate("/");
    }
  };

  const ingredientsList = recipe.ingredients.split("\n");
  const instructionsList = recipe.instructions.split("\n");

  return (
    <div className="container py-4">
      <div className="recipe-form">
        <div className="card">
          <div className="card-body">
            <div className="recipe-details-row">
              <div className="col-md-8">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="card-title text-center display-4">
                    {recipe.title}
                  </h2>
                  <FavoriteButton recipeId={recipe.id} />
                </div>
                <p className="text-center card-text">
                  <small className="text-muted">
                    Created by: {recipe.user?.username}
                  </small>
                </p>

                <div className="mb-4">
                  <h4>Ingredients</h4>
                  <ul className="list-group px-4">
                    {ingredientsList.map((ingredient, index) => (
                      <li key={index} className="list-group-item">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4>Instructions</h4>
                  <ol className="list-group px-4">
                    {instructionsList.map((instruction, index) => (
                      <li key={index} className="list-group-item">
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="info-section mb-4">
                  <p className="card-text px-4">
                    <strong>Cooking Method:</strong> {recipe.cookingMethod.name}
                  </p>
                  <p className="card-text px-4">
                    <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                {recipe.imageUrl && (
                  <div className="recipe-image-container">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="img-fluid rounded shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-primary me-2" onClick={handleBack}>
                Back to{" "}
                {recipe.userId === currentUser.id
                  ? "My Recipes"
                  : "All Recipes"}
              </button>
            </div>

            <div className="mt-4">
              <RatingsSummary recipeId={recipeId} />
            </div>

            <div className="mt-4">
              <NotesList recipeId={recipeId} />
            </div>

            <SimilarRecipes currentRecipeId={recipeId} />
          </div>
        </div>
      </div>
    </div>
  );
};
