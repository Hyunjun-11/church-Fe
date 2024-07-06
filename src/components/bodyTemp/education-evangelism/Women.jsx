import BoardLayout from "../../common/board/BoardLayout";

const Women = () => {
  const name = "test";
  const type = "test2";

  console.log("" + name);
  console.log("" + type);

  return (
    <div>
      <BoardLayout title={"여전도회"} category={"WOMEN"} />
    </div>
  );
};

export default Women;
