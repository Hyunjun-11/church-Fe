import { useState } from "react";
import Category from "../../common/Category";
import BodyTitle from "../../common/BodyTitle";

const Greeting = () => {
  const categoryList = [
    "목사",
    "전도사",
    "장로",
    "안수집사",
    "권사",
    "집사",
    "찬양사역자",
  ];
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  return (
    <div>
      <BodyTitle title={"섬기는 사람들"} />
      <br />
      <Category list={categoryList} onCategoryChange={handleCategoryChange} />
      <div>
        <div>1</div>
        <div>2</div>
      </div>
    </div>
  );
};

export default Greeting;
