import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";

const LoginModal = ({ isOpen, onRequestClose }) => {
  const navi = useNavigate();
  const [memberId, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      //   document.body.style.overflow = "auto";
    }

    return () => {
      //   document.body.style.overflow = "auto";
    };
  }, [isOpen]);
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
      const response = await api.post("/member/signIn", {
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
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: "10",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "auto",
          padding: "0",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Title>로그인</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="text"
            placeholder="Id"
            value={memberId}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
    </ReactModal>
  );
};

export default LoginModal;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: #f0f2f5;
  border-radius: 8px;
`;

const Form = styled.form`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
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
    // background: linear-gradient(90deg, #0056b3, #007bff);
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  font-size: 24px;
  font-weight: 700;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
`;
