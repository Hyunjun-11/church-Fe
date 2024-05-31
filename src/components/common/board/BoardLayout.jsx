import { useNavigate } from "react-router-dom";
import "./BoardLayout.css";
import BodyTitle from "../BodyTitle";

const BoardLayout = ({ title, boardList }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`${id}`);
    console.log(id);
  };
  return (
    <div className="BoardLayout">
      <BodyTitle title={title} />
      <div className="board">
        <div className="board_header">
          <div className="board_number">번호</div>
          <div className="board_title">제목</div>
          <div className="board_date">날짜</div>
        </div>
        {boardList.map((item) => (
          <div key={item.id} className="board_body">
            <div className="board_number">{item.id}</div>
            <div className="board_title" onClick={() => handleClick(item.id)}>
              {item.title}
            </div>
            <div className="board_date">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardLayout;
