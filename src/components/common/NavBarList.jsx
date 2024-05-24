import { useNavigate } from "react-router-dom";
import "./NavBarList.css";
import { useState } from "react";
const NavBarList = ({ title, list, type }) => {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState({});

  const handleClick = (path, event) => {
    if (event) {
      event.stopPropagation();
    }
    navigate(path);
  };

  const toggleSubItems = (name) => {
    setOpenItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="NavBarList">
      <div className={`Title_NAV ${type}`}>{title}</div>

      <div className={`Bar_${type}`}>
        {list.map((item) =>
          type === "NAV" ? (
            // 네비게이션 바에서는 상위 항목만 표시
            <div key={item.name} onClick={() => handleClick(item.navi)}>
              {item.name}
            </div>
          ) : (
            // 리스트 페이지에서는 서브 항목도 함께 표시 및 토글 기능 추가
            <div key={item.name} className={`Bar_${type}`}>
              <div
                onClick={(e) => {
                  toggleSubItems(item.name);
                  handleClick(item.navi, e);
                }}
              >
                {item.name}
              </div>
              {openItems[item.name] && item.subItems && item.subItems.length > 0 && (
                <div className="SubItems">
                  {item.subItems.map((subItem) => (
                    <div key={subItem.name} className="SubItem" onClick={(e) => handleClick(subItem.navi, e)}>
                      {subItem.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default NavBarList;
