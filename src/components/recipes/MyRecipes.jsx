import { useEffect, useState } from "react";
import { deleteRecipe, getUserRecipesById } from "../../services/recipeService";
import { useNavigate } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";

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
    <div className="container py-4">
      <div className="card shadow-sm bg-light">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">My Recipes</h2>
          <div className="recipe-form">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="col">
                  <RecipeCard
                    recipe={recipe}
                    onViewRecipe={() => navigate(`/recipes/${recipe.id}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
