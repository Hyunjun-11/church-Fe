import NavBarList from "../../common/NavBarList";

const GospelResourcesList = ({ type }) => {
  const list = [
    {
      name: "복음에 대하여",
      navi: "/gospel-resources/about",
    },
    {
      name: "복음 자료실",
      navi: "/gospel-resources/materials",
    },
    {
      name: "전도 자료실",
      navi: "/gospel-resources/evangelism-materials",
    },
    {
      name: "선교 자료실",
      navi: "/gospel-resources/mission-materials",
    },
  ];

  return <NavBarList title="복음자료실" list={list} type={type} />;
};
export default GospelResourcesList;
