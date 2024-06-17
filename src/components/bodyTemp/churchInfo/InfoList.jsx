import React from "react";
import ListBar from "../../common/ListBar";

const InfoList = ({ isOpen, onItemClick, type }) => {
  const list = [
    {
      name: "인사말",
      navi: "/info/intro",
    },
    {
      name: "교회안내",
      navi: "/info/guide",
    },
    {
      name: "약도/주차안내",
      navi: "/info/parking",
    },
    {
      name: "새가족안내",
      navi: "/info/newMember",
    },
    {
      name: "섬기는 사람들",
      navi: "/info/greeting",
    },
    {
      name: "교회조직",
      navi: "/info/organization",
    },
  ];

  return (
    <ListBar
      title="교회소개"
      list={list}
      isOpen={isOpen}
      onItemClick={onItemClick}
      type={type}
    />
  );
};

export default InfoList;
