import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFavoritesByUserId } from "../../services/favoriteService";
import { RecipeCard } from "../recipes/RecipeCard";

export const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("recipe_user"));

  useEffect(() => {
    getFavoritesByUserId(currentUser.id).then(setFavorites);
  }, []);

  return (
    <div className="container py-4 recipe-form">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">My Favorite Recipes</h2>
          <div className="row g-4">
            {favorites.map(({ recipe }) => (
              <div key={recipe.id} className="col-12 col-md-6 col-lg-4">
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
  );
};
