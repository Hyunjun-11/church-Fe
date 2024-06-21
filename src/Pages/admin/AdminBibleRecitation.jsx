// AdminUsers.js

import React, { useEffect, useState } from "react";
import BodyTitle from "../../components/common/BodyTitle";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import AdminBibleRecitationWrite from "./AdminBibleRecitationWrite";

const AdminBibleRecitation = () => {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const response = await api.get(`board/`);
        // 날짜 기준으로 내림차순 정렬
        const sortedList = response.data.data.sort(
          (a, b) => new Date(b.createAt) - new Date(a.createAt)
        );
        setBoardList(sortedList);
      } catch (error) {
        console.error("There was an error fetching the board list!", error);
      }
    };

    fetchBoardList();
  }, []);

  const handleClick = (id) => {
    navigate(`${id}`);
  };

  const handleWriteClick = (path) => {
    setIsOpen(true);
  };
  const closeSignUpModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      {/* Admin Users content goes here */}
      <BodyTitle title={"말씀암송 관리"} />
      <BoardLayoutContainer>
        <Board>
          <BoardHeader>
            <BoardColumn className="number">번호</BoardColumn>
            <BoardColumn className="title">제목</BoardColumn>
            <BoardColumn className="author">작성자</BoardColumn>
            <BoardColumn className="date">날짜</BoardColumn>
          </BoardHeader>
          {boardList.map((item, index) => (
            <BoardBody key={item.boardId}>
              <BoardColumn className="number">{index + 1}</BoardColumn>
              <BoardColumn
                className="title"
                onClick={() => handleClick(item.boardId)}>
                {item.title}
              </BoardColumn>
              <BoardColumn className="author">{item.author}</BoardColumn>
              <BoardColumn className="date">
                {new Date(item.createAt).toLocaleString("ko-KR", {
                  timeZone: "Asia/Seoul",
                })}
              </BoardColumn>
            </BoardBody>
          ))}
        </Board>
        <ButtonContainer>
          <WriteButton onClick={() => handleWriteClick("write")}>
            글쓰기
          </WriteButton>
        </ButtonContainer>
      </BoardLayoutContainer>
      <AdminBibleRecitationWrite
        isOpen={isOpen}
        onRequestClose={closeSignUpModal}
      />
    </>
  );
};

export default AdminBibleRecitation;
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
    width: 10%;
  }

  &.title {
    width: 50%;
    cursor: pointer;
    text-align: left;
  }

  &.author {
    width: 20%;
  }

  &.date {
    width: 20%;
  }
`;

const WriteButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 10px;
  cursor: pointer;
  font-size: 16px;
  // margin: 20px 0;

  &:hover {
    background-color: #218838;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
