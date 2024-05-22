import NavBarList from "../../common/NavBarList";

const InfoList = ({ type }) => {
  const list = [
    {
      name: "인삿말",
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
      name: "섬기는분들",
      navi: "/info/greeting",
    },
    {
      name: "교회조직",
      navi: "/info/organization",
    },
  ];

  return <NavBarList title="교회소개" list={list} type={type} />;
};
export default InfoList;
