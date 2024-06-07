import { Link, useNavigate } from "react-router-dom";
import "./NavBarList.css";

const NavBarList = ({ title, list, type }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      {type === "NAV" ? (
        <div className="navbar">
          <div className="nav_title">{title}</div>
          <div className="nav_list">
            {list.map((item) => (
              <div key={item.id}>
                <Link to={item.navi}>{item.name}</Link>
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
