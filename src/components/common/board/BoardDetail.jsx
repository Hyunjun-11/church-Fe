import React from "react";
import { useParams } from "react-router-dom";
import "./BoardDetail.css";

const BoardDetail = () => {
  const { id } = useParams();
  const boardList = [
    { id: 1, number: 1, title: "첫번째 게시글", date: "2023-05-01", content: "첫번째 게시글 내용" },
    { id: 2, number: 2, title: "두번째 게시글", date: "2023-05-02", content: "두번째 게시글 내용" },
    // 더 많은 게시글 데이터 추가
  ];

  const selectedItem = boardList.find((item) => item.id === parseInt(id));

  return (
    <div className="BoardDetail">
      {selectedItem ? (
        <>
          <h2>{selectedItem.title}</h2>
          <p>{selectedItem.date}</p>
          <div className="content">{selectedItem.content}</div>
        </>
      ) : (
        <div>게시글을 찾을 수 없습니다.</div>
      )}
    </div>
  );
};

export default BoardDetail;
