import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavigatorBar from "./NavigatorBar";
import logo from "../../assets/PCK_Logo.png";
import LoginModal from "../modal/LoginModal";
import SignUpModal from "../modal/SignUpModal";

const Header = () => {
  const nav = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const onClick = (path) => {
    nav(path);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
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
          <div></div>
          <MenuItem onClick={openLoginModal}>로그인</MenuItem>
          <MenuItem onClick={openSignUpModal}>회원가입</MenuItem>
        </HeaderMenu>
      </HeaderInner>
      <NavigatorBar />
      <LoginModal isOpen={isLoginModalOpen} onRequestClose={closeLoginModal} />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onRequestClose={closeSignUpModal}
      />
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
  font-weight: 700;
  font-size: 18px;
`;

const LogoText = styled.div`
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
    color: #0697e6;
    transition: color 0.4s ease;
  }
`;
