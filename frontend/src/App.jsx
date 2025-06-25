import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/Auth/Login/Login"
import Home from "./components/Home/Home"


function App() {
  const isLoggedIn = localStorage.getItem("user") ? true : false;
  return (
    <Router>
      <div className="bg-gradient-to-br from-gray-950 to-gray-800 text-gray-100 font-inter antialiased min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
