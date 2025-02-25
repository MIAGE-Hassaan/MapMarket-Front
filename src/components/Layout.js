import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import "../styles/Layout.css";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="layout">
      <Sidebar collapsed={!collapsed} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${!collapsed ? "collapsed" : ""}`}>
        <Navbar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
