import { useNavigate } from "react-router-dom";
import FilterBar from "./FilterBar";
import "./Header.css";

const Header = () => {
  const nav = useNavigate();
  const onClick = (path) => {
    nav(path);
  };
  return (
    <div className="Header">
      <div className="Header_">
        <div
          className="Home"
          onClick={() => {
            onClick("/");
          }}
        >
          교회이름
        </div>
        <div>
          <div>로그인</div>
          <div>회원가입</div>
          <div>검색</div>
          <div>등등</div>
        </div>
      </div>
      <FilterBar />
    </div>
  );
};

export default Header;
