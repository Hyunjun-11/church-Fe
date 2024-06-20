import { useEffect, useState } from "react";
import "./Category.css";

const Category = ({ list, onCategoryChange, selectedCategory }) => {
  const [selected, setSelected] = useState(selectedCategory || "");

  useEffect(() => {
    if (list && list.length > 0) {
      const firstCategory =
        typeof list[0] === "string" ? list[0] : list[0].name;
      if (!selected && !selectedCategory) {
        setSelected(firstCategory);
        onCategoryChange(firstCategory);
      }
    }
  }, [list, selected, onCategoryChange, selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      setSelected(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    const categoryValue =
      typeof category === "string" ? category : category.name;
    setSelected(categoryValue);
    onCategoryChange(categoryValue);
  };

  if (!list || list.length === 0) return null;

  return (
    <div className="Category">
      {list.map((item) => {
        const categoryName = typeof item === "string" ? item : item.name;
        return (
          <div
            key={categoryName}
            className={selected === categoryName ? "selected" : ""}
            onClick={() => handleCategoryClick(item)}>
            {categoryName}
          </div>
        );
      })}
    </div>
  );
};

export default Category;
