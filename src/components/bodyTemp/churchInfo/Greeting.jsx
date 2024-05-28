import { useState } from "react";
import Category from "../../common/Category";
import BodyTitle from "../../common/BodyTitle";

const Greeting = () => {
  const categoryList = ["목사", "전도사", "장로", "안수집사", "권사", "집사", "찬양사역자"];
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);

  const handleCategoryChange = (category) => {
    console.log(category);
    setSelectedCategory(category);
  };
  return (
    <div>
      <BodyTitle title={"섬기는 사람들"} />

      <br />
      <Category list={categoryList} onCategoryChange={handleCategoryChange} />
    </div>
  );
};

export default Greeting;
