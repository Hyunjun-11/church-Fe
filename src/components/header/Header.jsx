import { useNavigate } from "react-router-dom";
import "./Header.css";
import NavigatorBar from "./NavigatorBar";

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
        <div className="HeaderMenu">
          <div
            onClick={() => {
              onClick("/login");
            }}
          >
            로그인
          </div>

          <div
            onClick={() => {
              onClick("/signup");
            }}
          >
            회원가입
          </div>
          <div
            onClick={() => {
              onClick("/admin");
            }}
          >
            관리자페이지(임시)
          </div>
        </div>
      </div>
      <NavigatorBar />
    </div>
  );
};

export default Header;
