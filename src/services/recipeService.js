//json-server --watch src/api/database.json --port 8088

const API_BASE = "http://localhost:8088";

export const getAllRecipes = () => {
  return fetch(`${API_BASE}/recipes?_expand=user`).then((res) => res.json());
};

export const getRecipeById = (id) => {
  return fetch(`${API_BASE}/recipes/${id}`).then((res) => res.json());
};
