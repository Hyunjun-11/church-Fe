// ImageBoardLayout.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BodyTitle from "../BodyTitle";

const ImageBoardLayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const ImageBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 40px;
`;

const ImageItem = styled.div`
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ImageThumbnail = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ImageTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
`;

const ImageDate = styled.div`
  font-size: 14px;
  color: #888;
  padding: 0 10px 10px;
`;

const ImageBoardLayout = ({ title, imageList }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`${id}`);
  };

  return (
    <ImageBoardLayoutContainer>
      <BodyTitle title={title} />
      <ImageBoard>
        {imageList.map((item) => (
          <ImageItem key={item.id} onClick={() => handleClick(item.id)}>
            <ImageThumbnail src={item.url} alt={item.title} />
            <ImageTitle>{item.title}</ImageTitle>
            <ImageDate>{item.date}</ImageDate>
          </ImageItem>
        ))}
      </ImageBoard>
    </ImageBoardLayoutContainer>
  );
};

export default ImageBoardLayout;
