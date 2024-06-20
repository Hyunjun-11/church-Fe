import React, { useEffect, useRef, useState } from "react";
import BodyTitle from "../../components/common/BodyTitle";
import styled from "styled-components";
import Category from "../../components/common/Category";
import api from "../../api/api";
import { useLocation, useNavigate } from "react-router-dom";

const AdminPost = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [boards, setBoards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.category || "전체"
  );
  const [selectedParam, setSelectedParam] = useState("");

  const categoryList = [
    { name: "전체", param: "" },
    { name: "다니엘 부서", param: "DANIEL" },
    { name: "사무엘 부서", param: "SAMUEL" },
    { name: "청년부 부서", param: "YOUTH" },
    { name: "여전도회 부서", param: "WOMEN" },
    { name: "남전도회 부서", param: "MEN1" },
    { name: "함섬 갤러리", param: "GALLERY" },
    { name: "함섬 영상갤러리", param: "VIDEO_GALLERY" },
  ];

  const handleCategoryChange = (category) => {
    const selected = categoryList.find((cat) => cat.name === category);
    setSelectedCategory(category);
    setSelectedParam(selected ? selected.param : "");
  };

  useEffect(() => {
    const fetchCategoryBoard = async () => {
      try {
        const endpoint =
          selectedCategory === "전체"
            ? "board/"
            : `board/category?category=${selectedParam}`;
        const response = await api.get(endpoint);
        const sortedList = response.data.data.sort(
          (a, b) => new Date(b.createAt) - new Date(a.createAt)
        );
        setBoards(sortedList);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchCategoryBoard();
  }, [selectedCategory, selectedParam]);

  const handleClick = (id) => {
    nav(`${id}`, { state: { category: selectedCategory } });
  };

  return (
    <Container>
      <BodyTitle title={"게시물 관리"} />
      <Category list={categoryList} onCategoryChange={handleCategoryChange} />
      <Board>
        <BoardHeader>
          <BoardColumn className="number">번호</BoardColumn>
          <BoardColumn className="title">제목</BoardColumn>
          <BoardColumn className="author">작성자</BoardColumn>
          <BoardColumn className="date">날짜</BoardColumn>
        </BoardHeader>
        {boards.map((item, index) => (
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
    </Container>
  );
};

export default AdminPost;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
    background-color: #e8f1fa;
  }
`;

const BoardColumn = styled.div`
  text-align: center;
  padding: 0 10px;

  &.number {
    width: 10%;
  }

  &.title {
    width: 40%;
    cursor: pointer;
    text-align: left;
  }

  &.author {
    width: 15%;
  }

  &.date {
    width: 20%;
  }
  &.category {
    width: 15%;
  }
`;
