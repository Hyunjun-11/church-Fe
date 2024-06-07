// BoardDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const BoardDetailContainer = styled.div`
  flex-grow: 1;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  padding: 20px;
  margin: 20px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
`;

const Date = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
`;

const Button = styled.div`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const BoardDetail = () => {
  const { id } = useParams();
  const boardList = [
    { id: 1, number: 1, title: "첫번째 게시글", date: "2023-05-01", content: "첫번째 게시글 내용" },
    { id: 2, number: 2, title: "두번째 게시글", date: "2023-05-02", content: "aa두번째 게시글 내용" },
    // 더 많은 게시글 데이터 추가
  ];

  const selectedItem = boardList.find((item) => item.id === parseInt(id));

  return (
    <>
      <BoardDetailContainer>
        {selectedItem ? (
          <>
            <Title>{selectedItem.title}</Title>
            <Date>{selectedItem.date}</Date>
            <Content>{selectedItem.content}</Content>
          </>
        ) : (
          <div>게시글을 찾을 수 없습니다.</div>
        )}
      </BoardDetailContainer>
      {selectedItem && (
        <ButtonContainer>
          <Button>수정</Button>
          <Button>삭제</Button>
        </ButtonContainer>
      )}
    </>
  );
};

export default BoardDetail;
