import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import api from "../../../api/api";
import { useSelector } from "react-redux";

const BoardDetailContainer = styled.div`
  padding: 20px;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 20px;
  color: #333;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #777;
  margin-bottom: 40px; /* 제목과 작성자 사이의 간격을 늘리기 위해 변경 */
`;

const Author = styled.div`
  padding-top: 20px;
  font-weight: bold;
`;

const DateStyled = styled.div`
  font-size: 14px;
  color: #777;
`;

const Content = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: #444;
  padding: 20px 0;
  border-top: 1px solid #ddd;
  // border-bottom: 1px solid #ddd;
  margin-bottom: 20px; /* 추가하여 아래 경계선이 맨 아래까지 나오도록 조정 */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const LeftButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const RightButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
const BackButton = styled.button`
  padding: 12px 20px;
  background-color: transparent;
  border: solid 1px;
  border-radius: 8px;
  color: #1976d2;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await api.get(`/board/${id}`);
        setSelectedItem(response.data.data);
      } catch (error) {
        setError("게시글을 불러오는데 실패했습니다.");
        console.error("board detail! error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardDetail();
  }, [id]);

  const handleEditClick = () => {
    if (selectedItem && user && selectedItem.memberId === user.id) {
      navigate(`/test/board/edit/${id}`);
    } else {
      alert("작성자만 수정할 수 있습니다.");
    }
  };
  const handleDeleteClick = async () => {
    if (selectedItem && user && selectedItem.memberId === user.id) {
      try {
        await api.delete(`board/${id}`);
        alert("게시글이 삭제되었습니다.");
        navigate("/test/board"); // 삭제 후 게시판 목록으로 이동
      } catch (error) {
        console.error("There was an error deleting the board!", error);
        alert("게시글 삭제에 실패했습니다.");
      }
    }
  };

  const handleBackClick = () => {
    navigate(-1); // 게시판 목록 페이지로 이동
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const formatDate = (dateString) => {
    const date = new window.Date(dateString); // 명시적으로 window 객체에서 Date 생성
    return date.toLocaleString(); // 날짜와 시간을 로컬 형식으로 변환
  };

  return (
    <>
      <BoardDetailContainer>
        {selectedItem ? (
          <>
            <Title>{selectedItem.title}</Title>
            <Info>
              <Author>작성자: {selectedItem.author}</Author>
              <DateStyled>{formatDate(selectedItem.createAt)}</DateStyled>
            </Info>
            <Content
              dangerouslySetInnerHTML={{ __html: selectedItem.content }}
            />
          </>
        ) : (
          <div>게시글을 찾을 수 없습니다.</div>
        )}
      </BoardDetailContainer>
      {selectedItem && (
        <ButtonContainer>
          <LeftButtonContainer>
            <BackButton onClick={handleBackClick}>목록으로</BackButton>
          </LeftButtonContainer>
          <RightButtonContainer>
            <Button onClick={handleEditClick}>수정</Button>
            <Button onClick={handleDeleteClick}>삭제</Button>
          </RightButtonContainer>
        </ButtonContainer>
      )}
    </>
  );
};

export default BoardDetail;
