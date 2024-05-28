import React from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";

const Layout = ({ ListComponent }) => {
  return (
    <div className="Layout">
      <div className="Banner">배너공간</div>
      <div className="BodyTemp">
        <div className="List">
          <ListComponent type={"LIST"} />
        </div>
        <div className="Outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
