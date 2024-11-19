const API_BASE = "http://localhost:8088";

export const getFriendsNotesByRecipeId = (recipeId) => {
  return fetch(
    `${API_BASE}/friendsNotes?recipeId=${recipeId}&_expand=user`
  ).then((res) => res.json());
};

export const addFriendsNote = (note) => {
  return fetch(`${API_BASE}/friendsNotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  }).then((res) => res.json());
};

export const editFriendsNote = (id, note) => {
  return fetch(`${API_BASE}/friendsNotes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  }).then((res) => res.json());
};

export const deleteFriendsNote = (id) => {
  return fetch(`${API_BASE}/friendsNotes/${id}`, {
    method: "DELETE",
  });
};
