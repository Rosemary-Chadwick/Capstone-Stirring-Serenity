//fix this page

// import { Routes, Route } from "react-router-dom"
// import { Navbar } from "./components/nav/Navbar"

import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ApplicationViews } from "./components/views/ApplicationView.jsx";
import { Authorized } from "./Authorized";

export function App() {
  return (
    <>
      {
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="*"
            element={
              <Authorized>
                <ApplicationViews />
              </Authorized>
            }
          />
        </Routes>
      }
    </>
  );
}
export default App;

// export const App = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="container mt-5">
//         <Routes>
//           {/* Add your routes here */}
//         </Routes>
//       </div>
//     </>
//   )
// }
