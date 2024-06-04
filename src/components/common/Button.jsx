// Button.jsx
import React from "react";
import styled from "styled-components";

const StyledButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  max-width: 100px; /* 최대 너비를 설정하여 버튼이 너무 커지지 않도록 함 */
  width: 100%; /* 부모 요소의 너비를 차지하도록 설정 */
  box-sizing: border-box; /* 패딩과 테두리를 포함하여 크기를 계산 */

  &:hover {
    background-color: #0056b3;
  }
`;

const Button = ({ title }) => {
  return <StyledButton>{title}</StyledButton>;
};

export default Button;
