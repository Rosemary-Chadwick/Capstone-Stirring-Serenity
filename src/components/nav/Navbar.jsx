import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Stirring Serenity
        </Link>
        <span className="navbar-text">Navbar text with an inline element</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/recipes/create">
                Create Recipe
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipes/my-recipes">
                My Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/login"
                onClick={() => localStorage.removeItem("recipe_user")}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

//style="background-color: #e3f2fd; instead of bg-dark

{
  /* <li className="nav-item">
<Link className="nav-link" to="/">
  Home/Do I need this link?
</Link>
</li> */
}
