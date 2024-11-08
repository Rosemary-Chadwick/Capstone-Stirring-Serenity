#!/bin/bash
set -u

# Remove default files
rm ./src/App.css
rm -rf ./src/assets
rm -rf ./public

# Create index.html with Bootstrap
echo '<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Stirring Serenity</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- Bootstrap JS Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>' >./index.html

# Create main.jsx
echo 'import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { App } from "./App.jsx"
import "./index.css"

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)' >./src/main.jsx

# Create basic App.jsx with Bootstrap navbar
echo 'import { Routes, Route } from "react-router-dom"
import { Navbar } from "./components/nav/Navbar"

export const App = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          {/* Add your routes here */}
        </Routes>
      </div>
    </>
  )
}' >./src/App.jsx

# Create directory structure
mkdir -p src/components/{nav,views,forms}
mkdir -p src/services

# Create Navbar component with Bootstrap
mkdir -p src/components/nav
echo 'import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Stirring Serenity</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {/* Add more nav items as needed */}
          </ul>
        </div>
      </div>
    </nav>
  )
}' >./src/components/nav/Navbar.jsx

# Create basic index.css
echo '/* Add your custom styles here */
body {
  margin: 0;
  min-height: 100vh;
}

/* Override Bootstrap styles here if needed */
' >./src/index.css

# Add .gitignore
echo 'node_modules
.env
.DS_Store
dist
dist-ssr
*.local' >.gitignore

echo "Project structure created successfully!"
