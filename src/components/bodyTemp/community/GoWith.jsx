import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BodyTitle from "../../common/BodyTitle";
import api from "../../../api/api";
import GoWithWrite from "../../modal/GoWithWrite";
import Button from "../../common/Button";

const ITEMS_PER_PAGE = 14;

const GoWith = () => {
  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  console.log(boardList);

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const response = await api.get("board/category?category=GOWITH");
        const sortedList = response.data.data.sort(
          (a, b) => new Date(b.createAt) - new Date(a.createAt)
        );
        setBoardList(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBoardList();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClick = (id) => {
    // 상세 페이지로 이동하는 로직
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderBoardItems = () => {
    const items = [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = boardList.slice(startIndex, endIndex);

    const positions = [
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 4 },
      { row: 1, col: 5 },
      { row: 2, col: 1 },
      { row: 2, col: 5 },
      { row: 3, col: 1 },
      { row: 3, col: 2 },
      { row: 3, col: 4 },
      { row: 3, col: 5 },
      { row: 4, col: 1 },
      { row: 4, col: 2 },
      { row: 4, col: 4 },
      { row: 4, col: 5 },
    ];

    let boardIndex = 0;
    for (let i = 0; i < 14; i++) {
      if (boardIndex < currentItems.length) {
        items.push(
          <BoardItem
            key={currentItems[boardIndex].boardId}
            style={{ gridColumn: positions[i].col, gridRow: positions[i].row }}
            onClick={() => handleClick(currentItems[boardIndex].boardId)}>
            <TitleItem>
              <div>{currentItems[boardIndex].title}</div>
              <Separator />
            </TitleItem>
            <div>{currentItems[boardIndex].content}</div>
          </BoardItem>
        );
        boardIndex++;
      } else {
        items.push(
          <BoardItem
            key={i}
            style={{ gridColumn: positions[i].col, gridRow: positions[i].row }}>
            <TitleItem>
              <div>제목</div>
              <Separator />
            </TitleItem>
            <div>여기에 게시판 최근글 {i + 1}번글</div>
          </BoardItem>
        );
      }
    }
    return items;
  };

  const totalPages = Math.ceil(boardList.length / ITEMS_PER_PAGE);

  return (
    <GoWithContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <BodyTitle title={"예수님과 동행 일기 게시판"} />
        <Button onClick={openModal} title={"글쓰기"} />
      </div>
      <BoardGrid>
        {renderBoardItems()}
        <CenterItem style={{ gridColumn: 3, gridRow: 1 }}>예</CenterItem>
        <CenterItem2 style={{ gridColumn: 2, gridRow: 2 }}>동</CenterItem2>
        <CenterItem style={{ gridColumn: 3, gridRow: 2 }}>수</CenterItem>
        <CenterItem2 style={{ gridColumn: 4, gridRow: 2 }}>행</CenterItem2>
        <CenterItem style={{ gridColumn: 3, gridRow: 3 }}>님</CenterItem>
        <CenterItem style={{ gridColumn: 3, gridRow: 4 }}>과</CenterItem>
      </BoardGrid>
      <Pagination>
        <PageButton
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}>
          {"<<"}
        </PageButton>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i}
            onClick={() => handlePageChange(i + 1)}
            active={currentPage === i + 1}>
            {i + 1}
          </PageButton>
        ))}
        <PageButton
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}>
          {">>"}
        </PageButton>
      </Pagination>
      <GoWithWrite isOpen={isOpen} onRequestClose={closeModal} />
    </GoWithContainer>
  );
};

export default GoWith;

// Styled-components for styling
const GoWithContainer = styled.div`
  display: grid;
  gap: 20px;
  border-radius: 8px;
  padding: 20px;
  background: #fff;
`;

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 10rem);
  width: 100%;
`;

const BoardItem = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
`;

const TitleItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;

const Separator = styled.div`
  width: 70%;
  border-bottom: 1px dashed black;
  margin: 10px 0;
`;

const CenterItem = styled.div`
  user-select: none;
  color: #ff6600;
  background-color: #ffe0cc;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 5rem;
  font-weight: bold;
  border: 1px solid black;
`;

const CenterItem2 = styled.div`
  user-select: none;
  color: #0000ff;
  background-color: #ffe0cc;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 5rem;
  font-weight: bold;
  border: 1px solid black;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background: ${(props) => (props.active ? "#bbb" : "#ddd")};
  cursor: pointer;

  &:hover {
    background: #bbb;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;
