import { useNavigate } from "react-router-dom";

const MenuItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(item.navi);
  };

  return (
    <div onClick={handleClick}>
      {item.name}
      {item.subItems && (
        <div className="SubList">
          {item.subItems.map((subItem) => (
            <MenuItem key={subItem.navi} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
