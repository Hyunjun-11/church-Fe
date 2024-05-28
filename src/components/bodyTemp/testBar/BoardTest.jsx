import BoardLayout from "../../common/board/BoardLayout";

const BoardTest = () => {
  const boardList = [
    {
      id: 1,
      title: "테스트제목",
      date: "2024-01-01",
    },
    {
      id: 2,
      title: "테스트제목",
      date: "2024-01-01",
    },
    {
      id: 3,
      title: "테스트제목dddddddddddddd",
      date: "2024-01-01",
    },
  ];
  return (
    <div>
      <BoardLayout title={"글 게시판테스트"} boardList={boardList} />
    </div>
  );
};

export default BoardTest;
