import { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { NavBar } from "../nav/NavBar.jsx";
import { RecipeList } from "../recipes/RecipeList";
import { RecipeDetails } from "../recipes/RecipeDetails";
import { CreateRecipe } from "../recipes/CreateRecipe.jsx";
import { MyRecipes } from "../recipes/MyRecipes.jsx";
import { EditRecipe } from "../recipes/EditRecipe.jsx";
import { FavoritesList } from "../favorites/FavoriteList.jsx";
import { UserProfile } from "../profile/UserProfile.jsx";

const Layout = () => {
  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  );
};

export const ApplicationViews = () => {
  const [currentUser] = useState(
    JSON.parse(localStorage.getItem("recipe_user"))
  );

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<RecipeList />} />
        <Route path="recipes">
          <Route index element={<RecipeList />} />
          <Route path=":recipeId" element={<RecipeDetails />} />
          <Route path="create" element={<CreateRecipe />} />
          <Route path="my-recipes" element={<MyRecipes />} />
          <Route path="favorites" element={<FavoritesList />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="edit/:recipeId" element={<EditRecipe />} />
        </Route>
      </Route>
    </Routes>
  );
};
// :recipeId is a dynamic parameter.
// The value of recipeId will be available as part of the URL, and React Router will capture it as a parameter.
