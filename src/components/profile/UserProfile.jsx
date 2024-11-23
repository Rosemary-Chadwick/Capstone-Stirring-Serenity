import { useState, useEffect } from "react";
import {
  getUserById,
  updateUser,
  checkEmailExists,
} from "../../services/userService";

export const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("recipe_user"));

  useEffect(() => {
    getUserById(currentUser.id).then((userData) => {
      setUser(userData);
      setFormData({
        username: userData.username,
        email: userData.email,
      });
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Validate fields
      if (!formData.username.trim() || !formData.email.trim()) {
        setError("All fields are required");
        return;
      }

      // Check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        return;
      }

      // Check if email already exists
      const emailExists = await checkEmailExists(
        formData.email,
        currentUser.id
      );
      if (emailExists) {
        setError("This email is already in use");
        return;
      }

      // Update user
      const updatedUser = await updateUser(currentUser.id, formData);
      setUser(updatedUser);

      // Update local storage
      localStorage.setItem(
        "recipe_user",
        JSON.stringify({
          ...currentUser,
          username: updatedUser.username,
          email: updatedUser.email,
        })
      );

      setSuccess("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container py-4">
      <div className="recipe-form">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">My Profile</h2>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}

            {editMode ? (
              <form onSubmit={handleSubmit} className="px-4">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex justify-content-center gap-2">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditMode(false);
                      setFormData({
                        username: user.username,
                        email: user.email,
                      });
                      setError("");
                      setSuccess("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="px-4">
                <div className="mb-3">
                  <strong>Username:</strong> {user.username}
                </div>
                <div className="mb-3">
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
