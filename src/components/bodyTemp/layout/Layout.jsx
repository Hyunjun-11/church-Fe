import React from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";

const Layout = ({ ListComponent }) => {
  return (
    <div className="Layout">
      <div className="List">
        <ListComponent type={"LIST"} />
      </div>
      <div className="Outlett">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
