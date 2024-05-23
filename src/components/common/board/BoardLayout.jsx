import "./BoardLayout.css";

const BoardLayout = ({ title }) => {
  return (
    <div className="Board">
      <div>{title}</div>
    </div>
  );
};

export default BoardLayout;
