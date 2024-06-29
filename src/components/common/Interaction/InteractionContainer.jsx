import React, { useState, useEffect } from "react";
import api from "../../../api/api";
import styled from "styled-components";

const InteractionContainer = ({
  boardId,
  likes,
  hearts,
  amens,
  fetchDetail,
}) => {
  const handleInteractionClick = async (type) => {
    try {
      await api.post(`board/${boardId}/${type}`);
      await fetchDetail();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <Interaction>
      <InteractionButton onClick={() => handleInteractionClick("like")}>
        👍 {likes}
      </InteractionButton>
      <InteractionButton onClick={() => handleInteractionClick("heart")}>
        ❤️ {hearts}
      </InteractionButton>
      <InteractionButton onClick={() => handleInteractionClick("pray")}>
        🙏 {amens}
      </InteractionButton>
      {/* <InteractionButton onClick={() => handleInteractionClick("pray")}>
        감동 {amens}
      </InteractionButton> */}
    </Interaction>
  );
};

export default InteractionContainer;

const Interaction = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;

const InteractionButton = styled.button`
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
