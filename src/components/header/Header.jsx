import { useNavigate } from "react-router-dom";
import "./Header.css";
import NavigatorBar from "./NavigatorBar";
import { Apitest } from "../bodyTemp/testBar/ServerApiTest";

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
          함께 섬기는 교회
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
              onClick("/signup-success");
            }}
          >
            회원가입완료페이지
          </div>
          <Apitest />
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
