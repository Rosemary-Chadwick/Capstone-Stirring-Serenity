import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "../../services/recipeService";

export const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRecipeById(recipeId).then(setRecipe);
  }, [recipeId]);

  if (!recipe) return <div>Loading...</div>;

  // Split the strings into arrays at the \n
  const ingredientsList = recipe.ingredients.split("\n");
  const instructionsList = recipe.instructions.split("\n");

  return (
    <div className="container py-4">
      <div className="card shadow-sm bg-light">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Recipe Details</h2>
          <div className="recipe-form">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{recipe.title}</h2>
                <div className="mb-3">
                  <strong>Cooking Method:</strong> {recipe.cookingMethod.name}
                  <br />
                  <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
                </div>

                <div className="mb-3">
                  <h4>Ingredients:</h4>
                  <ul className="list-group">
                    {ingredientsList.map((ingredient, index) => (
                      <li key={index} className="list-group-item">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <h4>Instructions:</h4>
                  <ol className="list-group">
                    {instructionsList.map((instruction, index) => (
                      <li key={index} className="list-group-item">
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="text-center">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate("/")}
                  >
                    Back to Recipes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
