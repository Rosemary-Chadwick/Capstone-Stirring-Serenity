const API_BASE = "http://localhost:8088";

export const getFavoritesByUserId = (userId) => {
  return fetch(`${API_BASE}/favorites?userId=${userId}&_expand=recipe`).then(
    (res) => res.json()
  );
};

export const addFavorite = (recipeId, userId) => {
  return fetch(`${API_BASE}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipeId: parseInt(recipeId),
      userId: parseInt(userId),
      dateAdded: new Date().toISOString(),
    }),
  }).then((res) => res.json());
};

export const removeFavorite = (favoriteId) => {
  return fetch(`${API_BASE}/favorites/${favoriteId}`, {
    method: "DELETE",
  });
};

export const checkIfFavorite = async (recipeId, userId) => {
  const response = await fetch(
    `${API_BASE}/favorites?recipeId=${recipeId}&userId=${userId}`
  );
  const favorites = await response.json();
  return favorites.length > 0 ? favorites[0] : null;
};
