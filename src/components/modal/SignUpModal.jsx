import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { containsSpecialChar, isValidEmail } from "../common/Validation";

const SignUpModal = ({ isOpen, onRequestClose }) => {
  const navi = useNavigate();
  const [name, setName] = useState("");
  const [memberId, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [position, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otherPosition, setOtherPosition] = useState("");
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (name.length > 10) {
      setError("이름은 10자 이하여야 합니다.");
      return;
    }
    if (!isValidUsername(memberId)) {
      setError("아이디는 영문자 또는 영문자와 숫자가 섞여야 합니다.");
      return;
    }
    if (memberId.length > 15) {
      setError("아이디는 15자 이하여야 합니다.");
      return;
    }
    if (password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }
    if (!containsSpecialChar(password)) {
      setError("비밀번호는 특수문자를 하나 이상 포함해야 합니다.");
      return;
    }
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (email && !isValidEmail(email)) {
      setError("유효한 이메일 주소를 입력하세요.");
      return;
    }

    const birth = `${year}-${month}-${day}`;
    const finalPosition = position === "기타" ? otherPosition : position;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}member/signUp`,
        {
          name,
          memberId,
          password,
          birth,
          position: finalPosition,
          email,
        }
      );
      if (response.status === 200) {
        navi("/");
        onRequestClose();
        alert("회원가입이 완료되었습니다.");
      }
    } catch (error) {
      setError("회원가입 중 오류가 발생했습니다.");
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

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
          width: "500px",
          height: "700px",
          padding: "0",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Title>회원가입</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <Label className="required">이름</Label>
          <Input
            type="text"
            placeholder="이름 (10자 이하)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Label className="required">아이디</Label>
          <Input
            type="text"
            placeholder="아이디 (영문자 또는 영문자와 숫자, 15자 이하)"
            value={memberId}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <Label className="required">비밀번호</Label>
          <Input
            type="password"
            placeholder="비밀번호 (최소 6자, 특수문자 포함)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Label className="required">비밀번호 확인</Label>
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Label>이메일</Label>
          <Input
            type="email"
            placeholder="이메일 (선택사항)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Label>생년월일</Label>
          <BirthdateContainer>
            <Select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">연도</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </Select>
            <Select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">월</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}월
                </option>
              ))}
            </Select>
            <Select value={day} onChange={(e) => setDay(e.target.value)}>
              <option value="">일</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}일
                </option>
              ))}
            </Select>
          </BirthdateContainer>

          <Label>직분</Label>
          <RadioContainer>
            <RadioLabel>
              <input
                type="radio"
                value="목회자"
                checked={position === "목회자"}
                onChange={(e) => setRole(e.target.value)}
              />
              목회자
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="장로"
                checked={position === "장로"}
                onChange={(e) => setRole(e.target.value)}
              />
              장로
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="권사"
                checked={position === "권사"}
                onChange={(e) => setRole(e.target.value)}
              />
              권사
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="집사"
                checked={position === "집사"}
                onChange={(e) => setRole(e.target.value)}
              />
              집사
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="평신도"
                checked={position === "평신도"}
                onChange={(e) => setRole(e.target.value)}
              />
              평신도
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="일반"
                checked={position === "일반"}
                onChange={(e) => setRole(e.target.value)}
              />
              일반
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="청년부"
                checked={position === "청년부"}
                onChange={(e) => setRole(e.target.value)}
              />
              청년부
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="학생"
                checked={position === "학생"}
                onChange={(e) => setRole(e.target.value)}
              />
              학생
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="기타"
                checked={position === "기타"}
                onChange={(e) => setRole(e.target.value)}
              />
              기타
            </RadioLabel>
          </RadioContainer>
          <HiddenInputContainer visible={position === "기타"}>
            <Input
              type="text"
              placeholder="직분을 입력하세요"
              value={otherPosition}
              onChange={(e) => setOtherPosition(e.target.value)}
            />
          </HiddenInputContainer>

          <Button type="submit">회원가입</Button>
        </Form>
      </FormContainer>
    </ReactModal>
  );
};

export default SignUpModal;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #f9fafb;
`;

const Form = styled.form`
  background: white;
  padding: 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  margin-bottom: 12px;
  padding: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;

  input {
    margin-right: 10px;
  }
`;

const HiddenInputContainer = styled.div`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  height: ${(props) => (props.visible ? "auto" : "0")};
  overflow: hidden;
`;

const Button = styled.button`
  background: #0697e6;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 20px;

  &:hover {
    background: #40a7e2;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #333;
  font-size: 14px;

  &.required::after {
    content: " *";
    color: red;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
`;

const BirthdateContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const Select = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 14px;
`;

const isValidUsername = (memberId) => {
  const re = /^[A-Za-z0-9]+$/;
  return re.test(String(memberId));
};
