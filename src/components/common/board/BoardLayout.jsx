// BoardLayout.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BodyTitle from "../BodyTitle";

const BoardLayoutContainer = styled.div`
  display: grid;
  gap: 20px;
  border-radius: 8px;
`;

const Board = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const BoardHeader = styled.div`
  display: flex;
  
  align-items: center;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const BoardBody = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const BoardColumn = styled.div`
  text-align: center;
  padding: 0 10px;

  &.number {
    width: 15%;
  }

  &.title {
    width: 70%;
    cursor: pointer;
    text-align: left;
  }

  &.date {
    width: 15%;
  }
`;

const WriteButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin: 20px 0;

  &:hover {
    background-color: #218838;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap:12px;
  justify-content: flex-end;
`;

const BoardLayout = ({ title, boardList }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`${id}`);
    console.log(id);
  };

  const handleWriteClick = (path) => {
    navigate(path); // 글쓰기 페이지로 이동하는 경로 설정
  };

  return (
    <BoardLayoutContainer>
      <BodyTitle title={title} />
      <ButtonContainer>
        <WriteButton onClick={() => { handleWriteClick("write") }}>글쓰기폼1</WriteButton>
        <WriteButton onClick={() => { handleWriteClick("write2") }}>글쓰기폼2</WriteButton>
        <WriteButton onClick={() => { handleWriteClick("write3") }}>글쓰기폼3</WriteButton>
      </ButtonContainer>
      <Board>
        <BoardHeader>
          <BoardColumn className="number">번호</BoardColumn>
          <BoardColumn className="title">제목</BoardColumn>
          <BoardColumn className="date">날짜</BoardColumn>
        </BoardHeader>
        {boardList.map((item) => (
          <BoardBody key={item.id}>
            <BoardColumn className="number">{item.id}</BoardColumn>
            <BoardColumn className="title" onClick={() => handleClick(item.id)}>
              {item.title}
            </BoardColumn>
            <BoardColumn className="date">{item.date}</BoardColumn>
          </BoardBody>
        ))}
      </Board>
    </BoardLayoutContainer>
  );
};

export default BoardLayout;
