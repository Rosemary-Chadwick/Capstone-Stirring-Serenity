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
