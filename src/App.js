import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; 
import Home from "./pages/Home"; 
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
<<<<<<< HEAD
import Tasks from "./pages/Tasks";
=======
import CreateAccount from "./pages/CreateAccount";
>>>>>>> 768ca1b4df58ad8f99b88d550d78beb44dad6e5b

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout contient la Sidebar */}
        <Route path="/" element={<Layout />}>
<<<<<<< HEAD
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="tasks" element={<Tasks/>}/>
=======
          <Route index element={<Home />} /> {/* Page d'accueil */}
          <Route path="login" element={<Login />} /> {/* Page Login */}
          <Route path="forgotPassword" element={<ForgotPassword />} /> {/* Page ForgotPassword */}
          <Route path="resetPassword" element={<ResetPassword />} /> {/* Page ResetPassword */}
          <Route path="createAccount" element={<CreateAccount />} /> {/* Page CreateAccount */}
>>>>>>> 768ca1b4df58ad8f99b88d550d78beb44dad6e5b
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
