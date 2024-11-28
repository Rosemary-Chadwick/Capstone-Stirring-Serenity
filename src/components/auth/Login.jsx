import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext";
import "./Auth.css";
import { getUserByEmail } from "../../services/userService";

export const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { currentTheme, setCurrentTheme } = useTheme();

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

  const handleLogin = (event) => {
    event.preventDefault();

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "recipe_user",
          JSON.stringify({
            id: user.id,
            name: user.username,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <div className="auth-container">
      <div className="theme-toggle-container">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {currentTheme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
      <div className="container py-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <form className="auth-form" onSubmit={handleLogin}>
              <h1>Stirring Serenity</h1>
              <h2>Please sign in</h2>
              <fieldset>
                <div className="form-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                    className="form-control"
                    placeholder="Email address"
                    required
                    autoFocus
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group">
                  <button className="btn btn-primary" type="submit">
                    Sign in
                  </button>
                </div>
              </fieldset>
            </form>
            <div className="auth-link">
              <Link to="/register">Not a member yet?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//<fieldset> = group related elements within a form
// Inside a <fieldset>, you can include a <legend> tag to provide a caption or title for the group.
// <legend> helps users understand what the grouped form elements represent.
// <fieldset> and <legend> makes the form more accessible to screen readers and other assistive technologies
// most browsers will style a <fieldset> with a border around the group of form elements
// look up for styling
