import { Link, useNavigate } from "react-router-dom";
import "./NavBarList.css";
import { useState } from "react";

const NavBarList = ({ title, list, type }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
    window.location.reload();
  };

  return (
    <>
      {type === "NAV" ? (
        <div className="navbar">
          <div className="nav_title ">{title}</div>
          <div className="nav_list">
            {list.map((item) => (
              <div key={item.id}>
                <a
                  href={item.navi}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.navi);
                  }}>
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="listbar">
          <div className="list_title">{title}</div>
          <div className="list_list">
            {list.map((item) => (
              <div key={item.id} onClick={() => handleClick(item.navi)}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBarList;
