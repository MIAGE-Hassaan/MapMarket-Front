import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Tasks from "./pages/Tasks";
import Map from "./pages/Map";
import GestionStock from "./pages/GestionStocks";
import CreateAccount from "./pages/CreateAccount";
import EmployeeManagement from "./pages/EmployeeManagement";
import InformationEmployee from "./pages/InformationEmployee";
import PrivateRoute from "./components/PrivateRoute";
import Donnee from "./pages/Donnee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="createAccount" element={<CreateAccount />} />

          {/* Private routes */}
          <Route
            path="map"
            element={
              <PrivateRoute>
                <Map />
              </PrivateRoute>
            }
          />
            <Route
                path="donnee"
                element={
                    <PrivateRoute>
                        <Donnee/>
                    </PrivateRoute>
                }
            />
          <Route
            path="tasks"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route
            path="gestionStocks"
            element={
              <PrivateRoute>
                <GestionStock />
              </PrivateRoute>
            }
          />
          <Route
            path="employeeManagement"
            element={
              <PrivateRoute>
                <EmployeeManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="informationEmployee"
            element={
              <PrivateRoute>
                <InformationEmployee />
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
