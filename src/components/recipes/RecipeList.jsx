import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRecipes } from "../../services/recipeService";

export const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRecipes().then(setRecipes);
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mb-4">All Recipes</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">
                  <small className="text-muted">
                    Cooking Time: {recipe.cookingTime} minutes
                  </small>
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    Method: {recipe.cookingMethod}
                  </small>
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
