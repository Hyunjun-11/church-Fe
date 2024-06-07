// SignUp.jsx
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { containsSpecialChar, isValidEmail } from "../../../components/common/Validation";
import { Navigate, useNavigate } from "react-router-dom";

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
  border: solid 1px;
  // border-radius: 8px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  width: 350px;
`;

const Select = styled.select`
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

const Label = styled.label`
  margin-bottom: 5px;
  color: #333;

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

const isValidUsername = (memberId) => {
  const re = /^[A-Za-z0-9]+$/;
  return re.test(String(memberId));
};

const SignUp = () => {
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

    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/member/signUp`, {
        name,
        memberId,
        password,
        birth,
        position,
        email,
      });
      if (response.status === 200) {
        navi("/signup-success");
      }
    } catch (error) {
      setError("회원가입 중 오류가 발생했습니다.");
    }
  };

  const years = Array.from({ length: 100 }, (_, i) => 1925 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
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

        <Label>생년월일</Label>
        <BirthdateContainer>
          <Select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">연도</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
          <Select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">월</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </Select>
          <Select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">일</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </Select>
        </BirthdateContainer>

        <Label>직분</Label>
        <Select value={position} onChange={(e) => setRole(e.target.value)}>
          <option value="">직분 선택 (선택사항)</option>
          <option value="목회자">목회자</option>
          <option value="장로">장로</option>
          <option value="권사">권사</option>
          <option value="집사">집사</option>
          <option value="평신도">평신도</option>
          <option value="일반">일반</option>
          <option value="청년부">청년부</option>
          <option value="학생">학생</option>
        </Select>

        <Label>이메일</Label>
        <Input type="email" placeholder="이메일 (선택사항)" value={email} onChange={(e) => setEmail(e.target.value)} />

        <Button type="submit">회원가입</Button>
      </Form>
    </FormContainer>
  );
};

export default SignUp;
