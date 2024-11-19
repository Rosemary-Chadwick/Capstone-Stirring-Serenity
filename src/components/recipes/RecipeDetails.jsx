import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "../../services/recipeService";

export const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("recipe_user"));

  useEffect(() => {
    getRecipeById(recipeId).then(setRecipe);
  }, [recipeId]);

  const handleBack = () => {
    if (recipe?.userId === currentUser.id) {
      navigate("/recipes/my-recipes");
    } else {
      navigate("/");
    }
  };

  if (!recipe) return <div>Loading...</div>;

  const ingredientsList = recipe.ingredients.split("\n");
  const instructionsList = recipe.instructions.split("\n");

  return (
    <div className="container py-4">
      <div className="recipe-form">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center">{recipe.title}</h2>
            <p className="text-center card-text">
              <small className="text-muted">
                Created by: {recipe.user?.username}
              </small>
            </p>

            <div className="info-section mb-4">
              <p className="card-text">
                <strong>Cooking Method:</strong> {recipe.cookingMethod.name}
              </p>
              <p className="card-text">
                <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
              </p>
            </div>

            <div className="mb-4">
              <h4>Ingredients</h4>
              <ul className="list-group">
                {ingredientsList.map((ingredient, index) => (
                  <li key={index} className="list-group-item">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4>Instructions</h4>
              <ol className="list-group">
                {instructionsList.map((instruction, index) => (
                  <li key={index} className="list-group-item">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-primary me-2" onClick={handleBack}>
                Back to{" "}
                {recipe.userId === currentUser.id
                  ? "My Recipes"
                  : "All Recipes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
