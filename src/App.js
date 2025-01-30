import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; 
import Home from "./pages/Home"; 
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout contient la Sidebar + Navbar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Page d'accueil */}
          <Route path="login" element={<Login />} /> {/* Page Login */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
