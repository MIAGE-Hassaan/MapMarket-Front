import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1}}>
        <Navbar />
        <main style={{ flexGrow: 1, overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
