import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../../services/userService";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerNewUser = () => {
    createUser(user).then((createdUser) => {
      //return above statement? same as honey raes
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "recipe_user",
          JSON.stringify({
            id: createdUser.id,
            name: createdUser.username,
          })
        );
        navigate("/");
      }
    });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        setError("Account with that email address already exists");
      } else {
        setError("");
        registerNewUser();
      }
    });
  };

  const updateUser = (event) => {
    const copy = { ...user };
    copy[event.target.id] = event.target.value;
    setUser(copy);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>Stirring Serenity</h1>
        <h2>Please Register</h2>
        {error && <p className="error-message">{error}</p>}
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your user name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
