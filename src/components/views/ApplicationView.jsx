import { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { NavBar } from "../nav/NavBar.jsx";
import { RecipeList } from "../recipes/RecipeList";
import { RecipeDetails } from "../recipes/RecipeDetails";

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
          <Route path=":recipeId" element={<RecipeDetails />} />
        </Route>
      </Route>
    </Routes>
  );
};
