import React, { useEffect, useState } from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import axios from 'axios';

const Layout = ({ name, ListComponent }) => {
  const [bannerUrl, setBannerUrl] = useState("");

  useEffect(() => {
    const fetchCategoryBanner = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/banner/${name}`);
        setBannerUrl(response.data.data.url);
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };

    fetchCategoryBanner();
  }, [name]);

  return (
    <div className="Layout">
      <div className="Banner">
        <img src={bannerUrl} alt={`${name} 배너`} />
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
