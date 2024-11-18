import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editRecipe,
  getCookingMethods,
  getRecipeById,
} from "../../services/recipeService";

export const EditRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    userId: JSON.parse(localStorage.getItem("recipe_user")).id,
    cookingMethodId: "",
  });

  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [cookingMethods, setCookingMethods] = useState([]);

  useEffect(() => {
    getCookingMethods().then(setCookingMethods);
    getRecipeById(recipeId).then(setRecipe);
  }, [recipeId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanedRecipe = {
      ...recipe,
      ingredients: recipe.ingredients
        .split("\n")
        .map((i) => i.trim())
        .filter((i) => i !== "")
        .join("\n"),
      instructions: recipe.instructions
        .split("\n")
        .map((i) => i.trim())
        .filter((i) => i !== "")
        .join("\n"),
      cookingTime: parseInt(recipe.cookingTime) || 0,
      cookingMethodId: parseInt(recipe.cookingMethodId) || 0,
    };

    editRecipe(recipeId, cleanedRecipe).then(() => {
      navigate("/recipes/my-recipes");
    });
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm bg-light">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Edit Recipe</h2>
          <form className="recipe-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="card h-100 border-primary border-opacity-25">
                  <div className="card-body">
                    <h5 className="card-title mb-3">Recipe Information</h5>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Recipe Title</label>
                      <input
                        type="text"
                        className="form-control border border-2"
                        name="title"
                        value={recipe.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Cooking Method
                      </label>
                      <select
                        className="form-select border border-2"
                        name="cookingMethodId"
                        value={recipe.cookingMethodId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a method</option>
                        {cookingMethods.map((method) => (
                          <option key={method.id} value={method.id}>
                            {method.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Cooking Time (minutes)
                      </label>
                      <input
                        type="number"
                        name="cookingTime"
                        className="form-control border border-2"
                        value={recipe.cookingTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div className="card h-100 border-success border-opacity-25">
                  <div className="card-body">
                    <h5 className="card-title mb-3">Ingredients</h5>
                    <small className="form-text text-muted d-block mb-2">
                      Enter each ingredient on a new line
                    </small>
                    <textarea
                      className="form-control border border-2"
                      name="ingredients"
                      value={recipe.ingredients}
                      onChange={handleInputChange}
                      placeholder="1 cup sugar&#10;2 cups flour&#10;3 eggs"
                      rows="8"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 mb-3">
                <div className="card border-info border-opacity-25">
                  <div className="card-body">
                    <h5 className="card-title mb-3">Instructions</h5>
                    <small className="form-text text-muted d-block mb-2">
                      Enter each step on a new line
                    </small>
                    <textarea
                      className="form-control border border-2"
                      name="instructions"
                      value={recipe.instructions}
                      onChange={handleInputChange}
                      placeholder="1. Preheat oven to 350°F&#10;2. Mix dry ingredients&#10;3. Add wet ingredients"
                      rows="6"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary btn-lg px-5">
                Submit Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
