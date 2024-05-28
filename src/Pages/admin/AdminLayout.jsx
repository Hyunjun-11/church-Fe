// AdminLayout.js

import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(`${path}`);
  };
  return (
    <div className="AdminLayout">
      <header className="AdminHeader">
        <h1>Admin Dashboard</h1>
        <nav>
          <ul>
            <li onClick={() => handleClick("dashboard")}>Dashboard</li>
            <li onClick={() => handleClick("posts")}>Posts</li>
            <li onClick={() => handleClick("users")}>Users</li>
            <li onClick={() => handleClick("banner")}>Banner</li>
            <li onClick={() => handleClick("/")}>유저페이지</li>
          </ul>
        </nav>
      </header>
      <main className="AdminMain">
        <Outlet />
      </main>
      <footer className="AdminFooter">© 2024 Admin Dashboard</footer>
    </div>
  );
};

export default AdminLayout;
