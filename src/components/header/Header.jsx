import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavigatorBar from "./NavigatorBar";
import logo from "../../assets/PCK_Logo.png";
import api from "../../api/api";

const Header = () => {
  const nav = useNavigate();
  const onClick = (path) => {
    nav(path);
  };

  const testSubmit = async () => {
    await api.get("/member/user");
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        <Home onClick={() => onClick("/")}>
          <Logo src={logo} alt="PCK Logo" />
          <TextContainer>
            <EnglishText>함께섬기는 교회</EnglishText>
            <LogoText>대한예수교장로회</LogoText>
          </TextContainer>
        </Home>
        <HeaderMenu>
          <MenuItem onClick={() => onClick("/login")}>로그인</MenuItem>
          <MenuItem onClick={() => onClick("/signup")}>회원가입</MenuItem>
          {/* <MenuItem onClick={() => onClick("/admin")}>
            관리자페이지(임시)
          </MenuItem>
          <button onClick={testSubmit}>테스트버튼</button> */}
        </HeaderMenu>
      </HeaderInner>
      <NavigatorBar />
    </HeaderContainer>
  );
};

export default Header;

// Styled Components
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: solid 2px tomato;
  padding: 20px;
  height: 150px;
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Home = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  width: 50px; /* 원하는 너비로 조정 */
  height: auto; /* 높이는 자동으로 조정 */
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80%;
`;

const EnglishText = styled.div`
  // opacity: 0.5; /* 불투명도 조정 */
  font-weight: 700;
  font-size: 18px;
`;
const LogoText = styled.div`
  // opacity: 0.5; /* 불투명도 조정 */
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 2.3px;
`;

const HeaderMenu = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const MenuItem = styled.div`
  height: fit-content;
  cursor: pointer;
  &:hover {
    // text-decoration: underline;
    // opacity: 0.5;
    color: #0697e6;
    transition: color 0.4s ease;
  }
`;
