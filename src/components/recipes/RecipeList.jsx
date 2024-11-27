import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRecipes, getCookingMethods } from "../../services/recipeService";
import { RecipeCard } from "./RecipeCard";

export const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [cookingMethods, setCookingMethods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllRecipes().then(setRecipes);
    getCookingMethods().then(setCookingMethods);
  }, []);

  useEffect(() => {
    let filtered = [...recipes];

    //This checks if the title of the recipe (converted to lowercase) contains the searchTerm (also converted to lowercase), ignoring case.
    if (searchTerm) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // selected method has both the string and numerical value so parsInt can change it from a string to a number
    if (selectedMethod) {
      filtered = filtered.filter(
        (recipe) =>
          parseInt(recipe.cookingMethodId) === parseInt(selectedMethod)
        //or (recipe) => recipe.cookingMethodId.toString() === selectedMethod.toString()
      );
    }

    setFilteredRecipes(filtered);
  }, [searchTerm, selectedMethod, recipes]);

  return (
    <div className="container py-4 recipe-form">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">All Recipes</h2>

          <div className="row mb-4">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
              >
                <option value="">Cooking Methods</option>
                {cookingMethods.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row g-4">
            {filteredRecipes.map((recipe) => (
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
