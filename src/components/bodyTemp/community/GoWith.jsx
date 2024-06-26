import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BodyTitle from "../../common/BodyTitle";
import api from "../../../api/api";
import GoWithWrite from "../../modal/GoWithWrite";
import Button from "../../common/Button";
import GoWithInfo from "../../modal/GoWithInfo";

const ITEMS_PER_PAGE = 14;

const GoWith = () => {
  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // 상세 모달 상태
  const [selectedBoardId, setSelectedBoardId] = useState(null); // 선택된 게시물 ID

  const fetchBoardList = async () => {
    console.log("리렌더");
    try {
      const response = await api.get("board/category?category=GOWITH");
      const sortedList = response.data.data.sort(
        (a, b) => new Date(b.createAt) - new Date(a.createAt)
      );
      setBoardList(sortedList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBoardList();
  }, []);

  const openWriteModal = () => {
    setIsWriteModalOpen(true);
  };

  const closeWriteModal = () => {
    fetchBoardList(); // 게시물 목록을 다시 가져
    setIsWriteModalOpen(false);
  };

  const openDetailModal = (boardId) => {
    setSelectedBoardId(boardId);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    fetchBoardList(); // 게시물 목록을 다시 가져
    setSelectedBoardId(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = weekDays[date.getDay()];

    return `${year}-${month}-${day} (${dayOfWeek})`;
  };

  const renderBoardItems = () => {
    if (boardList.length === 0) {
      return <div>Loading...</div>; // 데이터가 로드되기 전 로딩 메시지 표시
    }

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
      if (boardIndex < currentItems.length && currentItems[boardIndex]) {
        // IIFE를 사용하여 현재의 boardIndex를 캡처
        ((currentItem) => {
          items.push(
            <BoardItem
              key={currentItem.boardId}
              style={{
                gridColumn: positions[i].col,
                gridRow: positions[i].row,
              }}
              onClick={() => {
                openDetailModal(currentItem.boardId);
              }}>
              <TitleItem>{currentItem.title}</TitleItem>
              <UserInfo>
                <div>{currentItem.author}</div>
                <div>{formatDate(currentItem.createAt)}</div>
              </UserInfo>
              <ItemContent>{currentItem.content}</ItemContent>
            </BoardItem>
          );
        })(currentItems[boardIndex]); // 현재 아이템을 IIFE에 전달
        boardIndex++;
      } else {
        items.push(
          <BoardItem
            key={i}
            style={{ gridColumn: positions[i].col, gridRow: positions[i].row }}>
            <TitleItem></TitleItem>
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
        <Button onClick={openWriteModal} title={"글쓰기"} />
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
          <PageButton key={i} onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </PageButton>
        ))}
        <PageButton
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}>
          {">>"}
        </PageButton>
      </Pagination>
      <GoWithWrite isOpen={isWriteModalOpen} onRequestClose={closeWriteModal} />
      <GoWithInfo
        isOpen={isDetailModalOpen}
        onRequestClose={closeDetailModal}
        boardId={selectedBoardId}
        onUpdate={fetchBoardList}
      />
    </GoWithContainer>
  );
};

export default GoWith;
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
  gap: 4px;
  flex-direction: column;
  // align-items: center;
  text-align: center;
  padding: 10px;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    background-color: #e8f1fa;
  }
`;

const TitleItem = styled.div`
  width: 100%;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
`;
const UserInfo = styled.div`
  display: flex;
  gap: 2.5rem;
  color: #ff822f;
  width: 100%;
`;
const ItemContent = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-align: start;
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
