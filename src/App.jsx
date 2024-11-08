import { Routes, Route } from "react-router-dom"
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
}
