//json-server --watch src/api/database.json --port 8088

const API_BASE = "http://localhost:8088";
// defines where your JSON server is running

export const getUserByEmail = (email) => {
  return fetch(`${API_BASE}/users?email=${email}`).then((res) => res.json());
};

export const createUser = (user) => {
  return fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const getUserById = (id) => {
  return fetch(`${API_BASE}/users/${id}`).then((res) => res.json());
};

export const updateUser = (id, userData) => {
  return fetch(`${API_BASE}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((res) => res.json());
};

//verify email uniqueness when updating
export const checkEmailExists = async (email, userId) => {
  const users = await fetch(`${API_BASE}/users?email=${email}`).then((res) =>
    res.json()
  );
  return users.some((user) => user.id !== userId && user.email === email);
};
