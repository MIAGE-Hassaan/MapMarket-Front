import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom"; // Permet d'afficher les pages

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "20px" }}>
        <Outlet /> {/* Affiche Home ou Login selon l'URL */}
      </main>
    </div>
  );
};

export default Layout;
