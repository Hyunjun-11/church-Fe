import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const SuccessContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5; /* 연한 회색 배경 */
`;

const Message = styled.div`
  background: white;
  padding: 40px 60px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 380px;
  width: 100%;
`;

const Icon = styled.div`
  font-size: 50px;
  color: #2ecc71;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  color: #333;
  font-size: 24px;
  font-weight: bold;
`;

const Text = styled.p`
  color: #666;
  font-size: 16px;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }

  &:first-child {
    margin-right: 10px;
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
        <Text>환영합니다! 회원가입이 성공적으로 완료되었습니다.</Text>
        <ButtonContainer>
          <Button onClick={handleLoginClick}>로그인</Button>
          <Button onClick={handleHomeClick}>홈으로</Button>
        </ButtonContainer>
      </Message>
    </SuccessContainer>
  );
};

export default SignUpSuccess;
