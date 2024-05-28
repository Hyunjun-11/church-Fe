import "./BodyTitle.css";
const BodyTitle = ({ title }) => {
  return (
    <div className="BodyTitle">
      <span className="Line"></span>
      <div className="">{title}</div>
    </div>
  );
};

export default BodyTitle;
