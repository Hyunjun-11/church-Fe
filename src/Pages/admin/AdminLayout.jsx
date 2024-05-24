// AdminLayout.js

import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="AdminLayout">
      <header className="AdminHeader">
        <h1>Admin Dashboard</h1>
        <nav>
          <ul>
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/posts">Posts</Link>
            </li>
            <li>
              <Link to="/admin/users">Users</Link>
            </li>
            <li>
              <Link to="/">유저페이지</Link>
            </li>
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
