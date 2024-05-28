import React, { useState } from "react";
import "./Category.css";

const Category = ({ list }) => {
  const [selectedCategory, setSelectedCategory] = useState(list[0]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="Category">
      {list.map((item) => (
        <div
          key={item}
          className={selectedCategory === item ? "selected" : ""}
          onClick={() => handleCategoryClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Category;
