import React from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";

const Layout = ({ ListComponent }) => {
  return (
    <div className="Layout">
      <div className="Banner">
        <img src="https://storage.googleapis.com/church_image_demo_11/3d3d6fe3-1c5b-49b6-9ad2-e8e9ed0db849" alt="" />
      </div>
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
