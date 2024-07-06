import ListBar from "../../common/ListBar";

const TestList = ({ isOpen, onItemClick, type }) => {
  const list = [
    {
      name: "일반 게시판",
      navi: "/test/develop",
    },
    // {
    //   name: "이미지게시판",
    //   navi: "/test/imageboard",
    // },
    // {
    //   name: "일정표",
    //   navi: "/test/cal",
    // },
  ];
  const name = 1;
  const type2 = 2;
  console.log(name);
  console.log(type2);

  return (
    <ListBar
      title="개발 과정"
      list={list}
      isOpen={isOpen}
      onItemClick={onItemClick}
      type={type}
    />
  );
};
export default TestList;
