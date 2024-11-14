import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../../services/recipeService";

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

  useEffect(() => {
    getRecipeById(recipeId).then(setRecipe);
  }, [recipeId]);

  return <h1>hello world</h1>;
};
