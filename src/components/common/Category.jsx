import { useEffect, useState } from "react";
import "./Category.css";

const Category = ({ list, onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (list && list.length > 0) {
      setSelectedCategory(list[0]);
      onCategoryChange(list[0]);
    }
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  if (!list || list.length === 0) return null;

  return (
    <div className="Category">
      {list.map((item) => (
        <div
          key={item}
          className={selectedCategory === item ? "selected" : ""}
          onClick={() => handleCategoryClick(item)}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default Category;
