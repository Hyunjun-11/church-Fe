// SignUpSuccess.jsx
import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const SuccessContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // height: 100vh;
  // background: white; /* 배경색을 흰색으로 설정 */
  animation: ${fadeIn} 1s ease-out;
`;

const Message = styled.div`
  // background: #f8f9fa; /* 연한 회색 배경 */
  padding: 60px;
  border-radius: 12px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.07);
  text-align: center;
  // animation: ${fadeIn} 1s ease-out;
`;

const Icon = styled.div`
  font-size: 50px;
  color: #2ecc71;
  margin-bottom: 20px;
  animation: ${fadeIn} 1.5s ease-out;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  animation: ${fadeIn} 2s ease-out;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  animation: ${fadeIn} 2.5s ease-out;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  margin: 0 10px;

  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }
`;

const SignUpSuccess = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <SuccessContainer>
      <Message>
        <Icon>
          <FaCheckCircle />
        </Icon>
        <Title>회원가입이 완료되었습니다!</Title>
        <p>환영합니다! 회원가입이 성공적으로 완료되었습니다.</p>
        <ButtonContainer>
          <Button onClick={handleLoginClick}>로그인</Button>
          <Button onClick={handleHomeClick}>홈으로 돌아가기</Button>
        </ButtonContainer>
      </Message>
    </SuccessContainer>
  );
};

export default SignUpSuccess;
