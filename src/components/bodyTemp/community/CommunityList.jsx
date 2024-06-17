import React from "react";
import ListBar from "../../common/ListBar";

const CommunityList = ({ isOpen, onItemClick, type }) => {
  const list = [
    {
      name: "교회소식",
      navi: "/community/news",
    },
    {
      name: "함섬갤러리",
      navi: "/community/gallery",
    },
    {
      name: "함성영상자료실",
      navi: "/community/videos",
    },
    {
      name: "말씀암송",
      navi: "/community/bibleRecitation",
    },
    {
      name: "말씀읽기",
      navi: "/community/bibleReading",
    },
    {
      name: "매일성경",
      navi: "/community/dailybible",
    },
  ];

  return (
    <ListBar
      title="커뮤니티"
      list={list}
      isOpen={isOpen}
      onItemClick={onItemClick}
      type={type}
    />
  );
};

export default CommunityList;
