import NavBarList from "../../common/NavBarList";

const WorshipInfoList = ({ type }) => {
  const list = [
    {
      name: "교회비전",
      navi: "/worship/vision",
    },
    {
      name: "교회표어",
      navi: "/worship/slogan",
    },
    {
      name: "연간행사계획",
      navi: "/worship/annual-plan",
    },
    {
      name: "주보",
      navi: "/worship/bulletin",
    },
  ];

  return <NavBarList title="예배안내" list={list} type={type} />;
};
export default WorshipInfoList;
