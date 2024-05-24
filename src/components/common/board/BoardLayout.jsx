import { useNavigate } from "react-router-dom";
import "./BoardLayout.css";

const BoardLayout = ({ title, boardList }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/test/board/${id}`);
  };
  return (
    <div className="BoardLayout">
      <div>{title}</div>
      <div className="board">
        <div className="board_header">
          <div className="number">번호</div>
          <div className="title">제목</div>
          <div className="date">날짜</div>
        </div>
        {boardList.map((item) => (
          <div key={item.id} className="board_body">
            <div className="number">{item.number}</div>
            <div className="title" onClick={() => handleClick(item.id)}>
              {item.title}
            </div>
            <div className="date">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardLayout;
