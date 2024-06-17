import React, { useEffect, useState } from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import axios from "axios";
import PopupModal from "../../modal/PopupModal";

const Layout = ({ name, ListComponent }) => {
  const [bannerUrl, setBannerUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCategoryBanner = async () => {
      try {
        const encodedName = encodeURIComponent(name);
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}banner/${encodedName}`
        );
        setBannerUrl(response.data.data.url);
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    setIsOpen(true);
    fetchCategoryBanner();
  }, [name]);
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="Layout">
      {/* <PopupModal isOpen={isOpen} onRequestClose={closeModal} /> */}
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
