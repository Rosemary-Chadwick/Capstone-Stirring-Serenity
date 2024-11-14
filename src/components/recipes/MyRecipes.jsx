import { useEffect, useState } from "react";
import { deleteRecipe, getUserRecipesById } from "../../services/recipeService";
import { useNavigate } from "react-router-dom";

export const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("recipe_user"));
  const navigate = useNavigate();

  const getRecipes = () => {
    getUserRecipesById(currentUser.id).then(setRecipes);
  };

  const handleDelete = (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(recipeId).then(() => {
        getRecipes();
      });
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mb-4">My Recipes</h2>
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
                    Method: {recipe.cookingMethod?.name}
                  </small>
                </p>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/recipes/${recipe.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate(`/recipes/edit/${recipe.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
