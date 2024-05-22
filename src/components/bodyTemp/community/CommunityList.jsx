import NavBarList from "../../common/NavBarList";

const CommunityList = ({ type }) => {
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

  return <NavBarList title="커뮤니티" list={list} type={type} />;
};
export default CommunityList;
