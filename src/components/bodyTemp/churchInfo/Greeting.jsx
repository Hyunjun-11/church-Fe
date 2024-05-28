import Category from "../../common/Category";

const Greeting = () => {
  const categoryList = ["목사", "전도사", "찬양 사역자"];
  return (
    <div>
      <div>섬기는 사람들</div>
      <br />
      <Category list={categoryList} />
    </div>
  );
};

export default Greeting;
