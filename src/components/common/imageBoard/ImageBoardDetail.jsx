// ImageBoardDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ImageBoardDetailContainer = styled.div`
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Date = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
`;

const Content = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`;

const Image = styled.img`
  max-width: 40%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.div`
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const ImageBoardDetail = () => {
  const { id } = useParams();
  const imageBoardList = [
    {
      id: 1,
      title: "첫번째 이미지",
      date: "2023-05-01",
      content: "첫번째 이미지 내용",
      imageUrl: "https://storage.googleapis.com/church_image_demo_11/%EB%83%A5%EB%83%A52.png",
    },
    {
      id: 2,
      title: "두번째 이미지",
      date: "2023-05-02",
      content: "두번째 이미지 내용",
      imageUrl: "https://storage.googleapis.com/church_image_demo_11/%EB%83%A5%EB%83%A52.png",
    },
    // 더 많은 이미지 게시글 데이터 추가
  ];

  const selectedItem = imageBoardList.find((item) => item.id === parseInt(id));

  return (
    <>
      <ImageBoardDetailContainer>
        {selectedItem ? (
          <>
            <Title>{selectedItem.title}</Title>
            <Date>{selectedItem.date}</Date>
            <Content>{selectedItem.content}</Content>
            <Image src={selectedItem.imageUrl} alt={selectedItem.title} />
          </>
        ) : (
          <div>게시글을 찾을 수 없습니다.</div>
        )}
      </ImageBoardDetailContainer>
      {selectedItem && (
        <ButtonContainer>
          <Button>수정</Button>
          <Button>삭제</Button>
        </ButtonContainer>
      )}
    </>
  );
};

export default ImageBoardDetail;
