import React from "react";
import { useParams } from "react-router-dom";
import "./ImageBoardDetail.css";

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
      <div className="ImageBoardDetail">
        {selectedItem ? (
          <>
            <div className="Detail_title">{selectedItem.title}</div>
            <div className="Detail_date">{selectedItem.date}</div>
            <div className="Detail_content">{selectedItem.content}</div>
            <img src={selectedItem.imageUrl} alt={selectedItem.title} className="Detail_image" />
          </>
        ) : (
          <div>게시글을 찾을 수 없습니다.</div>
        )}
      </div>
      <div className="Detail_button_container">
        <div className="Detail_button">수정</div>
        <div className="Detail_button">삭제</div>
      </div>
    </>
  );
};

export default ImageBoardDetail;
