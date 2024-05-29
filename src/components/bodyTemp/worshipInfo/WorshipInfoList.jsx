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
      name: "교회일정",
      navi: "/worship/church-schedule",
    },
    {
      name: "교회행사 앨범",
      navi: "/worship/event-album",
    },
    {
      name: "주보",
      navi: "/worship/bulletin",
    },
  ];

  return <NavBarList title="예배안내" list={list} type={type} />;
};
export default WorshipInfoList;
