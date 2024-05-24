import { useNavigate } from "react-router-dom";
import "./ImageBoardLayout.css";

const ImageBoardLayout = ({ title, imageList }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`${id}`);
  };

  return (
    <div className="ImageBoardLayout">
      <div>{title}</div>
      <div className="image_board">
        {imageList.map((item) => (
          <div key={item.id} className="image_item" onClick={() => handleClick(item.id)}>
            <img src={item.url} alt={item.title} className="image_thumbnail" />
            <div className="image_title">{item.title}</div>
            <div className="image_date">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageBoardLayout;
