// LoginForm.jsx
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 100vh;
  // background: #f0f2f5;
`;

const Form = styled.form`
  background: white;
  padding: 40px;
  border-radius: 8px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
`;

const Login = () => {
  const navi = useNavigate();
  const [memberId, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (memberId.length > 15) {
      setError("잘못된 회원정보 입니다.");
      return;
    }

    if (password.length < 6) {
      setError("잘못된 회원정보 입니다.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/member/login", {
        memberId,
        password,
      });

      if (response.status === 200) {
        navi("/");
      } else {
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Title>로그인</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input type="text" placeholder="Id" value={memberId} onChange={(e) => setUsername(e.target.value)} required />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </Form>
    </FormContainer>
  );
};

export default Login;
