import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; 
import Home from "./pages/Home"; 
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Tasks from "./pages/Tasks";
import Map from "./pages/Map";
import EmployeeManagement from "./pages/EmployeeManagement";
import InformationEmployee from "./pages/InformationEmployee";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout contient la Sidebar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="tasks" element={<Tasks/>}/>
          <Route path="map" element={<Map/>}/>
          <Route path="employeeManagement" element={<EmployeeManagement/>}/>
          <Route path="informationEmployee/:nom/:prenom" element={<InformationEmployee/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
