import ListBar from "../../common/ListBar";
import NavBarList from "../../common/NavBarList";

const WorshipInfoList = ({ isOpen, onItemClick, type }) => {
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

  return (
    <ListBar
      title="예배안내"
      list={list}
      isOpen={isOpen}
      onItemClick={onItemClick}
      type={type}
    />
  );
};
export default WorshipInfoList;
