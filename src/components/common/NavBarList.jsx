import { useNavigate } from "react-router-dom";
import "./NavBarList.css";
const NavBarList = ({ title, list, type }) => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };
  return (
    <div>
      {title}
      <div className={`Bar_${type}`}>
        {list.map((item) => (
          <div key={item.navi} onClick={() => handleClick(item.navi)}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBarList;
