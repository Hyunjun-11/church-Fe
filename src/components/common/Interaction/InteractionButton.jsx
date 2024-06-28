import React from "react";
import styled from "styled-components";

const Button = styled.button`
  min-width: fit-content;
  display: flex;
  padding: 8px 16px;
  font-size: 16px; /* 폰트 크기를 16px로 설정하여 이모티콘이 잘 보이도록 함 */
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: #f0f0f0; /* 버튼 배경색 설정 */
  color: #333; /* 버튼 텍스트 색상 설정 */
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0; /* 호버 시 배경색 변경 */
  }
`;

const InteractionButton = ({ type, count, active, onClick }) => (
  <Button onClick={() => onClick(type)} active={active}>
    {type === "like" && <>👍 {count}</>}
    {type === "heart" && <>❤️ {count}</>}
    {type === "pray" && <>🙏 {count}</>}
  </Button>
);

export default InteractionButton;
