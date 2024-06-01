import NavBarList from "../../common/NavBarList";

const TestList = ({ type }) => {
  const list = [
    {
      name: "일반 게시판",
      navi: "/test/board",
    },
    {
      name: "이미지게시판",
      navi: "/test/imageboard",
    },
    {
      name: "일정표",
      navi: "/test/cal",
    },
  ];

  return <NavBarList title="테스트목록" list={list} type={type} />;
};
export default TestList;
