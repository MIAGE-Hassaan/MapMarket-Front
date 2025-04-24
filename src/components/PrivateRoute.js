import React from "react";
import { Navigate } from "react-router-dom";
import { verifyTokenValidity } from "../services/authService";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = verifyTokenValidity();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
