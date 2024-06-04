// BoardLayout.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BodyTitle from "../BodyTitle";

const BoardLayoutContainer = styled.div`
  display: grid;
  gap: 20px;
  border-radius: 8px;
  // padding: 20px;
  // background: #f9f9f9;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const BoardLayout = ({ title, boardList }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`${id}`);
    console.log(id);
  };

  return (
    <BoardLayoutContainer>
      <BodyTitle title={title} />
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
