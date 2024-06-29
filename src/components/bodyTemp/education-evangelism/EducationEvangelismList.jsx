import React from "react";
import ListBar from "../../common/ListBar";

const EducationEvangelismList = ({ isOpen, onItemClick, type }) => {
  const list = [
    {
      name: "사무엘",
      navi: "/education-evangelism/samuel",
    },
    {
      name: "다니엘",
      navi: "/education-evangelism/daniel",
    },
    {
      name: "에스더",
      navi: "/education-evangelism/esther",
    },
    {
      name: "청년부",
      navi: "/education-evangelism/youth",
    },
    {
      name: "여전도회",
      navi: "/education-evangelism/women",
    },
    {
      name: "남전도회 Ⅰ",
      navi: "/education-evangelism/men1",
    },
    {
      name: "남전도회 Ⅱ",
      navi: "/education-evangelism/men2",
    },
  ];

  return (
    <ListBar
      title="교육·전도"
      list={list}
      isOpen={isOpen}
      onItemClick={onItemClick}
      type={type}
    />
  );
};

export default EducationEvangelismList;
