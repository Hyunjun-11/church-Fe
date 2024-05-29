import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

const Toolbar = (props) => {
  const { onNavigate, label } = props;
  const handleDate = () => {};

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={() => onNavigate("PREV")}>
          이전달
        </button>
        <button type="button" onClick={() => onNavigate("TODAY")}>
          오늘
        </button>
        <button type="button" onClick={() => onNavigate("NEXT")}>
          다음달
        </button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
    </div>
  );
};

export default Toolbar;
