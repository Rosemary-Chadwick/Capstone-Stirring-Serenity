//json-server --watch src/api/database.json --port 8088

const API_BASE = "http://localhost:8088";

export const getAllRecipes = () => {
  return fetch(`${API_BASE}/recipes?_expand=user&_expand=cookingMethod`).then(
    (res) => res.json()
  );
};

export const getRecipeById = (id) => {
  return fetch(`${API_BASE}/recipes/${id}?_expand=cookingMethod`).then((res) =>
    res.json()
  );
};

export const createRecipeInfo = (recipe) => {
  return fetch(`${API_BASE}/recipes`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(recipe),
  }).then((res) => res.json());
};

export const getCookingMethods = () => {
  return fetch(`${API_BASE}/cookingMethods`).then((res) => res.json());
};

export const getUserRecipesById = (id) => {
  return fetch(`${API_BASE}/recipes?userId=${id}&_expand=cookingMethod`).then(
    (res) => res.json()
  );
};

export const deleteRecipe = (id) => {
  return fetch(`${API_BASE}/recipes/${id}`, {
    method: "DELETE",
  });
};

export const editRecipe = (id, recipe) => {
  return fetch(`${API_BASE}/recipes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  }).then((res) => res.json());
};
