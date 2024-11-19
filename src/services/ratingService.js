const API_BASE = "http://localhost:8088";

export const getRecipeRatings = (recipeId) => {
  return fetch(`${API_BASE}/ratings?recipeId=${recipeId}&_expand=user`).then(
    (res) => res.json()
  );
};

export const addOrUpdateRating = (rating) => {
  // First check if user already has a rating for this recipe
  return fetch(
    `${API_BASE}/ratings?userId=${rating.userId}&recipeId=${rating.recipeId}`
  )
    .then((res) => res.json())
    .then((existingRatings) => {
      if (existingRatings.length > 0) {
        // Update existing rating
        return fetch(`${API_BASE}/ratings/${existingRatings[0].id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...existingRatings[0],
            rating: rating.rating,
          }),
        });
      } else {
        // Add new rating
        return fetch(`${API_BASE}/ratings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rating),
        });
      }
    })
    .then((res) => res.json());
};
