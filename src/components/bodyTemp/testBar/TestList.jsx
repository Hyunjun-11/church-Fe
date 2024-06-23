import ListBar from "../../common/ListBar";

const TestList = ({ isOpen, onItemClick, type }) => {
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

  return (
    <ListBar
      title="테스트목록"
      list={list}
      isOpen={isOpen}
      onItemClick={onItemClick}
      type={type}
    />
  );
};
export default TestList;
